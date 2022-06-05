import { 
  Center, Box, Heading,
  FormControl, FormLabel, Input, Button, 
} from "@chakra-ui/react"
import {Link} from "react-router-dom"
import {useState} from "react"

export default function RegisterView(){
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [email, setEmail] = useState("")

  return(
    <Center h="100vh">
      <Box 
        borderWidth={1}
        borderRadius={10}
        boxShadow="lg"
        padding={5}
        textAlign="center"
      >
        <Heading>Registrate al Issue Tracker</Heading>
        o <Link to="/login">Inicia Sesión</Link>
        <FormControl isRequired mt={10}>
          <FormLabel>Email</FormLabel>
          <Input 
            type="email" 
            onChange = {(e) => setEmail(e.target.value)}
            placeholder="Email" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Nombre de usuario</FormLabel>
          <Input 
            type="text" 
            onChange = {(e) => setUsername(e.target.value)}
            placeholder="Nombre de usuario" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Contraseña</FormLabel>
          <Input 
            type="password" 
            onChange = {e => setPassword(e.currentTarget.value)}
            placeholder="Contraseña" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Confirma contraseña</FormLabel>
          <Input 
            type="password" 
            isInvalid = {password !== confirmPassword && confirmPassword !== ""}
            onChange = {e => setConfirmPassword(e.currentTarget.value)}
            placeholder="Confirma contraseña" />
        </FormControl>
        <Center mt={8}>
          <Button
            colorScheme="teal"
            width="full"
            disabled = {password !== confirmPassword 
              || password === "" 
              || username === "" 
              || email === ""}
          >Regístrate</Button>
        </Center>
      </Box>
    </Center>
  )
}
