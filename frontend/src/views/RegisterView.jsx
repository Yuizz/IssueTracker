import { 
  Center, Box, Heading,
  FormControl, FormLabel, Input, Button, 
} from "@chakra-ui/react"
import {Link, useNavigate} from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import {useState, useContext} from "react"
import { links, token } from "../utils"
import { UserContext } from "../providers/AuthProvider"

export default function RegisterView(){
  const navigate = useNavigate()
  const {login} = useContext(UserContext)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [email, setEmail] = useState("")

  const [error, setError] = useState("")
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false)

  const [isRegistering, setIsRegistering] = useState(false)

  const handleRegister = (e) => {
    setError(null)
    if(!validateEmail(email)){ return }
    if(!validatePassword(password)){ return }
    if(!validateConfirmPassword(confirmPassword)){ return }

    setIsRegistering(true)
    fetch(links.backendLink('register'),{
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email, 
        password,
      })
    })
      .then(response => {
        if(response.status === 201){
          return response.json()
        }
        throw new Error('Ocurrió un error al registrarse.')
      })
      .then(data => {
        setIsRegistering(false)
        if(data.errors){
          setError(data.errors.error)
          return
        } 

        if(data.data && data.data.token){
          const userData = data.data
          const userToken = userData.token
          const user = userData.user
          token.setToken(userToken)
          login(user)
          navigate('/profile/' + user.username)
        }
      })
      .catch(err => {
        setIsRegistering(false)
        setError(err.message)
      })
  }
  const validateEmail = (emailToValidate) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const isValid = re.test(String(emailToValidate).toLowerCase())
    setIsEmailValid(isValid)
    setEmail(emailToValidate)
    if(!isValid){
      setError("Escribe una dirección de correo válida.")
      return isValid
    }
    setError("")
    return isValid
  }

  const validatePassword = (passwordToValidate) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])([A-Za-z\d$@$!%*?&_]|[^ ]){8,15}$/
    const isValid = re.test(String(passwordToValidate))
    setIsPasswordValid(isValid)
    setPassword(passwordToValidate)
    if(!isValid){
      setError("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial(_$@$!%*?&).")
      return isValid
    }
    setError("")
    return isValid
  }

  const validateConfirmPassword = (confirmPasswordToValidate) => {
    setConfirmPassword(confirmPasswordToValidate)
    if(password !== confirmPasswordToValidate){
      setError("Las contraseñas no coinciden.")
      setIsConfirmPasswordValid(false)
      return false
    }
    setError("")
    setIsConfirmPasswordValid(true)
    return true
  }

  return(
    <Center minH="100vh">
      <Box 
        borderWidth={1}
        borderRadius={10}
        boxShadow="lg"
        padding={5}
        textAlign="center"
        // maxWidth="25%"
        width={{
          'sm': '100%',
          'md': "80%",
          'lg': '60%',
          'xl': '40%',
          '2xl': '30%',
        }}
      >
        <Heading>Registrate al Issue Tracker</Heading>
        o <Link to="/login">Inicia Sesión</Link>
        { error && <ErrorMessage message={error}/> }
        <FormControl isRequired mt={10}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email" 
            isInvalid={email !== "" && !isEmailValid}
            onBlur = {(e) => {validateEmail(e.currentTarget.value)}}
            placeholder="Email" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Nombre de usuario</FormLabel>
          <Input 
            type="text" 
            onBlur = {(e) => setUsername(e.target.value)}
            placeholder="Nombre de usuario" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Contraseña</FormLabel>
          <Input 
            type="password" 
            isInvalid={password !== "" && !isPasswordValid}
            onBlur = {e => {validatePassword(e.currentTarget.value)}}
            placeholder="Contraseña" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Confirma contraseña</FormLabel>
          <Input 
            type="password" 
            isInvalid = {confirmPassword !== "" && !isConfirmPasswordValid }
            onBlur = {e => validateConfirmPassword(e.currentTarget.value)}
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
            isLoading={isRegistering}
            loadingText = "Registrando..."
            onClick={handleRegister}
          >Regístrate</Button>
        </Center>
      </Box>
    </Center>
  )
}
