import {
  Avatar, Button, ButtonGroup, createStandaloneToast,
  Drawer, DrawerBody,
  DrawerCloseButton,
  DrawerContent, DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Link, Stack, StackDivider, Tag, Text,
  useDisclosure,
} from "@chakra-ui/react"
import {useState} from "react"
import {getToken} from "../utils/token";
import {formatDate} from "../utils/formatDate";
import {labelColor} from "../utils/labelColor";
import { EditIcon } from "@chakra-ui/icons";
import {DeleteAlertDialog} from "./DeleteAlertDialog";

export function IssueDrawer({reFetch, canEdit, ...props}){
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ issue, setIssue ] = useState({})

  const onDelete = () => {
    fetch(issue.url, {
      method:'DELETE',
      headers:{
        'Authorization' : 'Token ' + getToken(),
      }
    }).then(response => {
      if(response.status === 204){
        onClose()
        const toast = createStandaloneToast()
        toast({
        title: 'El issue fue borrado.',
        status:'warning',
        duration:6000,
        isClosable:true,
          })
        reFetch()
      }

      if(response.status === 400){
        onClose()
        const toast = createStandaloneToast()
        toast({
        title: 'No tienes ese permiso.',
        status:'error',
        duration:6000,
        isClosable:true,
          })
      }
    })
  }

  const handleOpen = () => {
    onOpen()

    fetch(props.issue.url, {
      method: 'GET',
      headers: {
        'Authorization': 'Token ' + getToken(),
      }
    }).then(response => {
      response.json().then(data=>{
        setIssue(data.data ? data.data : {})
      })

      if (response.status === 404){
        onClose()
        const toast = createStandaloneToast()
        toast({
        title: 'El issue no existe.',
        status:'error',
        duration:6000,
        isClosable:true,
          })
        reFetch()
      }
    })
  }

  return(
    <>
      <Heading fontSize={'sm'}>
        <Link onClick={handleOpen}>{props.issue.title}</Link>
      </Heading>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton/>
            <DrawerHeader mt={5}>
              <Heading size={'md'}>{issue.title ? issue.title : 'Titulo del issue'}</Heading>
              <Text fontSize={'xs'} textColor={'gray.500'} mt={1}>Abierto en {issue.project_name}</Text>
            </DrawerHeader>

            <DrawerBody>
              <Stack divider={<StackDivider borderColor="gray.300" />}>
                <Stack>
                  <Stack isInline>
                    <Avatar mr={2} size={'sm'} src={issue.author ? issue.author.avatar_url : ''}/>
                    <Stack>
                      <Heading size={'xs'} textColor={'gray'}>{issue.author ? issue.author.username : 'Autor del issue'}</Heading>
                      <Text fontSize={'xs'} textColor={'gray'}>Abierto el {issue.created_at ? formatDate(issue.created_at) : ''}</Text>
                    </Stack>
                  </Stack>
                  <Text fontSize={'xs'}>
                    {issue.description}
                  </Text>
                </Stack>

                <Stack>
                  <Text fontSize={'xs'} textColor={'gray.500'}>Usuarios asignados</Text>

                  {issue.assignees ? issue.assignees.map(assignee => {
                    return (
                      <Stack isInline key={assignee.id}>
                        <Avatar size={'xs'} src={assignee.avatar_url}/>
                        <Text fontSize={'xs'}>{assignee.username}</Text>
                      </Stack>
                    )
                  }) : ''}

                </Stack>

                <Stack>
                  <Text fontSize={'xs'} textColor={'gray.500'}>Etiqueta</Text>{
                    issue.label ?
                      <Tag colorScheme={labelColor[issue.label.name]}
                           size={'md'}
                           width={'max-content'}
                      >{issue.label.name}</Tag>
                      : ''}
                </Stack>
              </Stack>
            </DrawerBody>

            {canEdit ?
              <DrawerFooter borderTopWidth={'1px'}>
              <ButtonGroup size={'sm'}>
                <Button colorScheme={'gray'}
                        leftIcon={<EditIcon/>}
                        isDisabled
                >Editar</Button>
                <DeleteAlertDialog title={'¿Borrar issue?'}
                                   message={'¿Estas seguro que quieres borrar el issue? Esta acción no se puede deshacer.'}
                                   onConfirmation={onDelete}
                />
              </ButtonGroup>
            </DrawerFooter>

              : '' }
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}