import {
  Box, Button, ButtonGroup, Center, Flex,
  Heading, Stack, StackDivider,
  Tag, Text, Tooltip
} from "@chakra-ui/react";
import { useParams } from 'react-router'
import {formatDate} from "../utils/formatDate";
import {IssueDrawer} from "./IssueDrawer";
import {labelColor} from "../utils/labelColor";
import {DrawerAddIssue} from "./drawers";
import {issueStatus} from "../utils/issueStatus";
import {ArrowBackIcon, ArrowForwardIcon, Icon} from "@chakra-ui/icons";
import {useFetch} from "../hooks/useFetch";
import {getToken} from "../utils/token";
import {LoadingElement} from "../utils/LoadingElement";
import {backendLink} from "../utils/links";
import React, {useState} from "react";
import ErrorMessage from "./ErrorMessage";

export function ProjectView({projects, reFetchProjects, ...props}){
  const params = useParams()
  const project = projects[params.project-1]
  const [query, setQuery] = useState(backendLink('issues', `?page=${1}&project=${project.id}`))

  const res = useFetch(query, {
    method:'GET',
    headers: {
      'Authorization': 'Token ' + getToken()
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
        <Heading>{project ? project.name : 'NoName'}</Heading>
        <DrawerAddIssue  projectId={project ? project.id : ''} reFetch={res.reFetch}/>
      </Stack>
      <Box
        borderWidth={1}
        borderRadius={10}
        p={5}
      >
        <Stack
          divider={<StackDivider borderColor="gray.200" />} >
          {!res.isLoading ?
            issues.map(issue=>issueCard(issue, res.reFetch))
            : <LoadingElement/>}
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

const issueCard = (issue, reFetch) => {
  const lastUpdate = formatDate(issue.updated_at)
  const status = issueStatus[issue.status-1]

  return(
    <Flex
      key={issue.id}
      height={'auto'}
      width={'full'}
    >
      <Stack isInline>
        <Stack>
          <Stack isInline>
            <Tooltip hasArrow label={status.name} placement={'left'}>
                <Icon as={status.icon} color={status.color}/>
            </Tooltip>
              {issue.label ? issue.label.name : ''}
            <Stack>
              <IssueDrawer issue={issue} reFetch={reFetch}/>
              <Tag
                colorScheme={issue.label ? labelColor[issue.label.name] : ''}
                borderRadius={20}
                width={'max-content'}
              >{issue.label ? issue.label.name : ''}</Tag>
            </Stack>
          </Stack>
          <Text fontSize={'xs'} textColor={'gray.500'}>Ultima actualización {lastUpdate}</Text>
        </Stack>
      </Stack>
    </Flex>
  )
}