import {
    Flex, Box, Text,
    Heading, Link, FormControl,
    FormLabel, Input, Stack,
    Checkbox, Button
} from "@chakra-ui/react"
import { useState } from 'react'
import { useFetch } from "../hooks/useFetch"
import { backendLink } from "../utils/links"
import { setToken } from '../utils/token'

export function LoginView() {
    
    return (
        <LoginArea/>  
    )
}

const LoginArea = () => {
    return (
        <Flex minHeight='100vh' width='full' align='center' justifyContent='center'>
            <Box
                borderWidth={1}
                px={4}
                width='full'
                maxWidth='450px'
                borderRadius={10}
                textAlign='center'
                boxShadow='lg'
            >
                <Box my={8}>
                    <Heading>Sign In to Your Account</Heading>
                    <Text>
                        Or <Link>register</Link>
                    </Text>
                </Box>
                <Box>
                    <LoginForm/>
                </Box>
            </Box>
        </Flex>
    )
}

const LoginForm = () => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [fetchStatus, setFetchStatus] = useState(false)

    const SignIn = (event) => {
        event.preventDefault()
        console.log(backendLink('login'))
        fetch(backendLink('login'), {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                    },
                body: JSON.stringify({
                    username: email,
                    password
            })
        })
            .then(response => response.json())
            .then(data => {
                setToken(data.data.token)
            }).catch(err => {
                console.log(err)
        })
        //TODO make a page with this hook to redirect
        // const res = useFetch(backendLink('login'), {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         'username': email,
        //         password
        //     })
        // })
        // console.log(res)
        // setFetchStatus(res.isLoading ? true : false)

    }

    return (
        <Box my ={4} textAlign='left'>
            <form>
                <FormControl isRequired>
                    <FormLabel>Email Address</FormLabel>
                    <Input
                        type='email'
                        placeholder='Enter your email address'
                        onChange={event => setEmail(event.currentTarget.value)}
                    ></Input>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type='password'
                        placeholder='Enter your password'
                        onChange={event => setPassword(event.currentTarget.value)}
                        onKeyUp={event => event.keyCode === 13 ? SignIn : 0}
                    ></Input>
                </FormControl>

                <Stack isInline justifyContent='space-between' mt={4}>
                    <Box>
                        <Checkbox>Remember me</Checkbox>
                    </Box>
                    <Box>
                        <Link>Forgot your password?</Link>
                    </Box>
                </Stack>

                <Button
                    isLoading={fetchStatus}
                    loadingText='Iniciando Sesión'
                    width='full'
                    mt={4}
                    onClick={SignIn}>Sign in</Button>
            </form>
        </Box>
    )
}
