import React from 'react'
import {
  Drawer, DrawerBody, DrawerFooter,
  DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton,
  Button,  Input,
  Box, FormLabel, Stack,
  useToast, useDisclosure,
} from "@chakra-ui/react"
import { useState } from "react"
import { useParams } from 'react-router-dom'
import { backendLink } from '../../utils/links'
import { getToken } from '../../utils/token'
import ErrorMessage from "../ErrorMessage"

export default function DrawerAddProject({ reFetch, ...props }) {
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

