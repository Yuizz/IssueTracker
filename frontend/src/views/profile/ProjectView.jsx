import {
  Box, Button, ButtonGroup, Center, createStandaloneToast, Flex,
  Heading, Stack, StackDivider,
  Tag, Text, Tooltip
} from "@chakra-ui/react";
import { useParams } from 'react-router-dom'
import { IssueDrawer, DrawerAddIssue } from "../../components/drawers";
import { ArrowBackIcon, ArrowForwardIcon, Icon } from "@chakra-ui/icons";
import { useFetch } from "../../hooks/useFetch";
import { LoadingElement } from "../../components";
import { links, token, formatDate, issueStatus, labelColor } from "../../utils";
import React, { useState } from "react";
import {ErrorMessage, DeleteAlertDialog} from "../../components/";

export default function ProjectView({projects, reFetchProjects,canEdit, ...props}){
  const params = useParams()
  const project = projects[params.project-1]
  const [query, setQuery] = useState(links.backendLink('issues', `?page=${1}&project=${project.id}`))

  const res = useFetch(query, {
    method:'GET',
    headers: {
      'Authorization': 'Token ' + token.getToken()
    }
  }, [query])

  if (res.isLoading || !res.response) return <LoadingElement/>
  if (res.response.errors) return <Center height={'25vh'}><ErrorMessage message={res.response.errors.error}/></Center>


  const issues = res.response.results

  const smoothScrollToTop = () => {
    const h = window.scrollY

    if(h>0){
      setTimeout(()=>{
        window.scrollTo(0, h-10)
        smoothScrollToTop()
      },3)
    }
  }
  //
  // const onDelete = () => {
  //   fetch(project.url, {
  //     method:'DELETE',
  //     headers:{
  //       'Authorization' : 'Token ' + token.getToken(),
  //     }
  //   }).then(response => {
  //     if(response.status === 204){
  //       onClose()
  //       const toast = createStandaloneToast()
  //       toast({
  //       title: 'El proyecto fue borrado.',
  //       status:'warning',
  //       duration:6000,
  //       isClosable:true,
  //         })
  //       reFetch()
  //     }
  //
  //     if(response.status === 400){
  //       onClose()
  //       const toast = createStandaloneToast()
  //       toast({
  //       title: 'No tienes ese permiso.',
  //       status:'error',
  //       duration:6000,
  //       isClosable:true,
  //         })
  //     }
  //   })
  // }

  function handlePrevious(){
    setQuery(res.response.previous)
    res.reFetch()
    smoothScrollToTop()
  }

  function handleNext(){
    setQuery(res.response.next)
    res.reFetch()
    smoothScrollToTop()
  }

  return(
    <Box
      width={'full'}
      height={'full'}
      {...props}
    >
      <Stack isInline p={3} justifyContent={'space-between'}>
        <Heading noOfLines={1}>{project ? project.name : 'NoName'}</Heading>

        {canEdit ?
          <ButtonGroup size={'md'}>
            <DeleteAlertDialog
              title={'¿Borrar proyecto?'}
              message={'¿Estas seguro que quieres borrar el proyecto? Esta acción no se puede deshacer.'}
              isDisabled
            />
          <DrawerAddIssue projectId={project ? project.id : ''} reFetch={res.reFetch}/>
        </ButtonGroup>
          : ''
        }
      </Stack>

      <Box
        borderWidth={1}
        borderRadius={10}
        p={5}
      >

        <Stack
          divider={<StackDivider borderColor="gray.200" />} >
          {!res.isLoading ?
            issues.map(issue=>issueCard(issue, res.reFetch, canEdit))
            : <LoadingElement/>
          }
        </Stack>

      </Box>
      <Stack isInline mt={'10px'} justifyContent={'center'} width={'full'}>
        <ButtonGroup size={'sm'} isAttached variant={'outline'}>
            <Button aria-label={'Previous page'}
                    isDisabled={!res.response.previous}
                    colorScheme={'blue'}
                    onClick={handlePrevious}
                    leftIcon={<ArrowBackIcon/>}>
              Anterior
            </Button>

            <Button aria-label={'Next page'}
                    isDisabled={!res.response.next}
                    colorScheme={'blue'}
                    onClick={handleNext}
                    rightIcon={<ArrowForwardIcon/>} >
              Siguiente
            </Button>
        </ButtonGroup>

      </Stack>
    </Box>
  )
}

const issueCard = (issue, reFetch, canEdit) => {
  const lastUpdate = formatDate(issue.updated_at)
  const status = issueStatus[issue.status]

  return(
    <Flex
      key={issue.id}
      height={'auto'}
      width={'full'}
    >
      <Stack isInline>
        <Stack>
          <Stack isInline>
            {issue.label ? issue.label.name : ''}
            <Stack>
              <Stack isInline>
                <IssueDrawer issue={issue} reFetch={reFetch} canEdit={canEdit}/>
                <Tag colorScheme={ status.color }>
                  <Icon as={status.icon} mx="3px"/> {status.name}
                </Tag>
                <Tag
                  colorScheme={ issue.label ? labelColor[issue.label.name] : '' }
                  borderRadius={ 20 }
                  width={ 'max-content' }
                >{ issue.label ? issue.label.name : '' }</Tag>
              </Stack>
            </Stack>
          </Stack>
          <Text fontSize={ 'xs' } textColor={ 'gray.500' }>Ultima actualización { lastUpdate }</Text>
        </Stack>
      </Stack>
    </Flex>
  )
}