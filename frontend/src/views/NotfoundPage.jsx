import React from 'react';
import { Box, Heading, Text, Button, Link, Center } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'

export function NotfoundPage() {
    const navigate = useNavigate();

    return (
      <Center h={'80vh'}>
        <Box textAlign="center" py={10} px={6}>
            <Heading
                display="inline-block"
                as="h2"
                size="2xl"
                bgGradient="linear(to-r, teal.400, teal.600)"
                backgroundClip="text"
            >
                404
            </Heading>
            <Text fontSize="18px" mt={3} mb={2}>
                Página no encontrada
            </Text>
            <Text color={'gray.500'} mb={6}>
                ¡Ups! La página a la que intentas acceder no existe.
            </Text>

            <Button
                colorScheme="teal"
                bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
                color="white"
                variant="solid"
                onClick={() => navigate('/login/')}
            >
                Ir al inicio
            </Button>
        </Box>
      </Center>
    );
}