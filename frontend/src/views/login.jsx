import {
  Flex, Box, Text,
  Heading, Link, FormControl,
  FormLabel, Input, Stack,
  Checkbox, Button,
} from "@chakra-ui/react"
import { useState } from 'react'
import { links, token } from "../utils"
import ErrorMessage from '../components/ErrorMessage'
import { useNavigate } from 'react-router-dom'

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
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [fetchStatus, setFetchStatus] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const SignIn = (event) => {
    setError(null)

    if(!username){
      setError('Username is required')
    }
    if(!password){
      setError('Password is required')
    }
    setFetchStatus(true)
    fetch(links.backendLink('login'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    .then(response => response.json())
    .then(data => {
      setFetchStatus(false)

      if(data.token){
        token.setToken(data.token)
        navigate('/profile/'+username+'/')
      }
      if(data.non_field_errors){
        setError(data.non_field_errors)
      }
    })
  }

    return (
      <Box my ={4} textAlign='left'>
        {error && <ErrorMessage message={error}/>}
        <form>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type='text'
              placeholder='Enter your username'
              onChange={event => setUsername(event.currentTarget.value)}
              onKeyDown={e=>{ if(e.key === "Enter") SignIn()}}
            ></Input>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              placeholder='Enter your password'
              onChange={event => setPassword(event.currentTarget.value)}
              onKeyDown={e=>{ if(e.key === "Enter") SignIn()}}
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
            loadingText='Fetching...'
            disabled={!username || !password}
            width='full'
            mt={4}
            onClick={SignIn}>Sign in
          </Button>
        </form>
      </Box>
    )
}
