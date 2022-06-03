import React from 'react'
import {
  Drawer, DrawerBody, DrawerFooter,
  DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton,
  Button,  Input, Select, Textarea, FormControl,
  Box, FormLabel, Stack, VStack, StackDivider,
  Avatar, Text, Heading, 
  useToast, useDisclosure,
} from "@chakra-ui/react"
import { useState } from "react"
import { useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { backendLink } from '../utils/links'
import { getToken } from '../utils/token'
import ErrorMessage from "./ErrorMessage"
import { CheckElement } from "./CheckElement"


export function DrawerAddProject({reFetch, ...props}){
  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = React.useRef()
  const username = useParams()
  const toast = useToast()

  const [name, setName] = useState('')

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function handleClose(success = false){
    onClose()
    setError('')
    setIsLoading(false)
    setName('')

    if(success===true){
      reFetch()

      toast({
        title: 'Proyecto creado.',
        status:'success',
        duration:6000,
        isClosable:true,
      })
    }
  }

  function handleSubmit(e){
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if(name.length > 20){
      setError('Error: el nombre del proyecto no puede superar los 20 caracteres.')
      setIsLoading(false)
      return 0
    }

    fetch(backendLink('projects'), {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        users: [username],
        status: true,
      }),
      headers: {
        'Authorization': 'Token ' + getToken(),
        'Content-Type': 'application/json',
      }
    }).then(response => {
      // response.status === 201 ? handleClose(true) : console.log('error')
      if(response.status === 201){
        handleClose(true)
      }
      else{
        setError('Error al crear el issue. Trata de nuevo.')
        setIsLoading(false)
      }
    })

  }

  return (
    <>
      <Button
        colorScheme="green"
        onClick={onOpen}
      >
        Nuevo Proyecto
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
              Crear nuevo proyecto
            </DrawerHeader>

            <DrawerBody>
              {error && <ErrorMessage message={error}/>}
              <Stack spacing="24px">
                <Box>
                  <FormLabel htmlFor="name">Nombre del proyecto</FormLabel>
                  <Input
                    ref={firstField}
                    id="name"
                    placeholder="Introduce el nombre del proyecto"
                    onChange={event => setName(event.currentTarget.value)}
                  />
                </Box>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                colorScheme={'blue'}
                onClick={handleSubmit}
                isLoading={isLoading}
                loadingText={'Fetching...'}
              >Crear</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}



export function DrawerAddIssue({projectId, reFetch, ...props}){
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const firstField = React.useRef()

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [labelId, setLabelId] = useState(null)
  const [assignees, setAssignees] = useState([])

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const res = useFetch(backendLink('newissuedata', projectId), {
    method:'GET',
    headers: {
      'Authorization': 'Token ' + getToken()
    }
  })

  let labels = res.isLoading || !res.response ? [] : res.response.data.labels
  let users = res.isLoading || !res.response ? [] : res.response.data.users

  function handleClose(success=false){
    onClose()
    setError('')
    setIsLoading(false)
    setAssignees([])
    setLabelId(null)

    if(success===true){
      reFetch()

      toast({
        title: 'Issue creado.',
        status:'success',
        duration:6000,
        isClosable:true,
      })
    }
  }

  function handleSubmit(e){
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (title.length > 50){
      setError('El título del issue no puede ser mayor a 50 caracteres.')
      return 0
    }

    fetch(backendLink('issues'), {
      method:'POST',
      body:JSON.stringify({
        'title':title,
        'label_id':labelId ? labelId : null,
        'description':desc,
        'project':projectId,
        'assignees': assignees
      }),
      headers: {
        'Authorization': 'Token ' + getToken(),
        'Content-Type': 'application/json',
      }
    }).then(response=>{
      if(response.status === 201) {
        handleClose(true)
      }
      else {
        setError('Error al crear el issue. Trata de nuevo.')
        setIsLoading(false)
      }
    })
  }

  return (
    <>
      <Button
        colorScheme="green"
        onClick={onOpen}
        {...props}
      >
        Nuevo Issue
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={handleClose}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
              Crear nuevo issue
            </DrawerHeader>

            <DrawerBody>
              <form id={'issue-form'}
                    onSubmit={handleSubmit}
              >
                {error && <ErrorMessage message={error}/>}

              <Stack spacing={'20px'}>

                <FormControl id={'title'} isRequired>
                  <FormLabel>Título del issue</FormLabel>
                  <Input ref={firstField}
                         onBlur={event => setTitle(event.target.value)}
                         placeholder={'Introduce el título del issue'}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="desc">Descripción</FormLabel>
                  <Textarea placeholder={'Escribe la descripción del issue'}
                            onBlur={event => setDesc(event.target.value)}
                            resize={'none'}
                            size={'sm'}
                            height={'20vh'}
                            id={'desc'} />
                </FormControl>

                <FormControl>
                  <FormLabel>Etiqueta</FormLabel>
                  <Select onChange={event=>setLabelId(event.target.value)}
                          placeholder={'Selecciona una etiqueta'}>
                    {labels.map(label => {
                      return(
                        <option key={label.id} value={label.id}>
                            {label.name}
                        </option>
                      )
                    })}
                  </Select>
                </FormControl>

                <FormControl>
                  <Stack isInline justifyContent={'space-between'}>
                    <FormLabel>Asignar usuarios</FormLabel>
                  </Stack>
                  <VStack spacing={0} divider={<StackDivider borderColor="gray.200" />}>
                    {users.map(user=>{
                      return(
                        <CheckElement key={user.id}
                                      value={user.id}
                                      list={assignees}
                                      setList={setAssignees}
                                      py={.5}
                                      px={5}
                        >
                          <Stack isInline>
                            <Avatar size={'xs'} src={user.avatar_url}/>
                            <Heading fontSize={'sm'}>{user.username}</Heading>
                            <Text fontSize={'xs'}>{user.first_name} {user.last_name}</Text>
                         </Stack>
                        </CheckElement>
                      )
                    })}
                  </VStack>
                </FormControl>


              </Stack>
              </form>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={handleClose}>
                Cancelar
              </Button>
              <Button
                type={'submit'}
                form={'issue-form'}
                isLoading={isLoading}
                loadingText={'Fetching...'}
                // onClick={Test}
                colorScheme="blue">Crear</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}