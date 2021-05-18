import React from 'react'
import {
    Drawer, DrawerBody, DrawerFooter,
    DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton,
    Button, useDisclosure, Input,
    Box, FormLabel, Stack,
    InputGroup, InputLeftAddon,
    InputRightAddon, Select, Textarea,
} from "@chakra-ui/react"
import { useState } from "react"
import { useParams } from 'react-router'
import { useFetch } from '../hooks/useFetch'
import { backendLink } from '../utils/links'
import { getToken } from '../utils/token'

export function DrawerAddProject(){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isFetching, setIsFetching] = useState(false)
    const firstField = React.useRef()
    const username = useParams()

    const [name, setName] = useState('')

    
    const PublishProject = () => {
        // if(name==='') return 0
        const project = {
            name: name,
            users: [username]
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
        }).then(response => response.status === 201 ? onClose() : console.log('error'))

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
                                colorScheme="blue"
                                onClick={PublishProject}
                                isLoading={isFetching}
                            >Crear</Button>
                    </DrawerFooter>
                </DrawerContent>
            </DrawerOverlay>
            </Drawer>
        </>
    )
}

export function DrawerAddIssue(){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()

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
                        <Stack spacing="24px">
                            <Box>
                            <FormLabel htmlFor="name">Nombre del proyecto</FormLabel>
                            <Input
                                ref={firstField}
                                id="name"
                                placeholder="Introduce el nombre del proyecto"
                            />
                            </Box>

                            <Box>
                                <FormLabel htmlFor="url">Url</FormLabel>
                                <InputGroup>
                                <InputLeftAddon>http://</InputLeftAddon>
                                <Input
                                    type="url"
                                    id="url"
                                    placeholder="Please enter domain"
                                />
                                <InputRightAddon>.com</InputRightAddon>
                            </InputGroup>
                            </Box>

                            <Box>
                                <FormLabel htmlFor="owner">Select Owner</FormLabel>
                                <Select id="owner" defaultValue="segun">
                                <option value="segun">Segun Adebayo</option>
                                <option value="kola">Kola Tioluwani</option>
                                </Select>
                            </Box>

                            <Box>
                                <FormLabel htmlFor="desc">Description</FormLabel>
                                <Textarea id="desc" />
                            </Box>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth="1px">
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="blue">Submit</Button>
                    </DrawerFooter>
                </DrawerContent>
            </DrawerOverlay>
            </Drawer>
        </>
    )
}