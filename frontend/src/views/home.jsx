import {
    Flex, Box, Text,
    Heading, Link, FormControl,
    FormLabel, Input, Stack,
    Checkbox, Button, Image, Avatar
} from "@chakra-ui/react"
import { useEffect, useState } from 'react'
import useFetch from 'react-fetch-hook'

export function Home() {
    // const [data, setData] = useState(null)
    // useEffect(() => {
    //     fetch('http://localhost:8000/users/1')
    //         .then(response => {
    //             if (response.ok) {
    //                 return response.json()
    //             }
    //             throw response
    //         })
    //         .then(data => {
    //             setData(data)
    //         })
    // },[])
    return (
        <Flex
            h="100%"
            direction={{base:'column', lg:'row'}}
        >
            <UserCard/>
        </Flex>
    )
}

const UserCard = () => {
    return (
        <Box
            borderWidth={1}
            borderRadius={10}
            boxShadow='lg'
            py={5}
            px={10}
            w={{ base: '100%', md: '35%', lg: '25%' }}
            display={{base:'flex', md:'block', lg:'list-item'}}
        >
                <Box
                    my={5}
                >
                    <Avatar
                        src='../img/pngegg.png'
                        size='2xl'
                    ></Avatar>
                </Box>
                <Box
                    width='full'
                >
                    <Heading>Nombre Apellido</Heading>
                    <Text>Username</Text>
                    <Button
                        mt={4}
                        width={{ base: 'max-content', md: 'full', lg: 'full' }}
                        alignSelf='flex-start'
                    >Cambiar datos</Button>
                </Box>
        </Box>
    )
}

const UserData = (user) => {
    
    return (
        <Box>

        </Box>
    )
}