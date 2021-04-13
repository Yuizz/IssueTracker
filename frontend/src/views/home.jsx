import {
    Flex, Box, Text, Heading,
    Stack, Button,
    Avatar, Tabs, TabList, Tab, TabPanels,
    TabPanel, Badge, Spinner
} from '@chakra-ui/react';
import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';

export function Home() {
    const res = useFetch("http://localhost:8000/profile/1", {
        method:'GET',
        headers: {
            'Authorization': 'Token ' + '4f30ddf84d08abfc7f1244e273a1acb7303f2bb3'
        }
    })
    
    if (res.isLoading || !res.response) return <div><Spinner /></div>
    console.log(res.response.data)
    return (
        <Flex h="100%" direction={{ base: 'column', md: 'row', lg: 'row' }}>
            <UserCard
                borderWidth={1}
                borderRadius={10}
                boxShadow="lg"
                py={5}
                px={10}
                maxW={{md:"382px"}}
                w={{ base: '100%', md: '50%', lg: '35%' }}
                display={{ base: 'flex', md: 'block', lg: 'block' }}
                userData = {res.response.data}
            />
            <Container
                mt='5%'
                width='100%'
            />
        </Flex>
    )
}

const UserCard = ({userData, ...props }) => {
    const firstName = userData.first_name
    const lastName = userData.last_name
    const username = userData.username

    return (
        <Box {...props}>
            <Box my={5}>
                <Avatar src="../img/pngegg.png" size="2xl"></Avatar>
            </Box>
            <Box width="full">
                <Heading>{firstName} {lastName}</Heading>
                <Text fontSize='xl'>{username}</Text>
                <Button
                    mt={4}
                    width={{ base: 'max-content', md: 'full', lg: 'full' }}
                >
                    Cambiar datos
                </Button>
            </Box>
        </Box>
    )
}

const Container = (props) => {
    const res = useFetch("http://localhost:8000/profile/1", {
        method:'GET',
        headers: {
            'Authorization': 'Token ' + '4f30ddf84d08abfc7f1244e273a1acb7303f2bb3'
        }
    })

    if (res.isLoading || !res.response) return <div><Spinner /></div>
    
    const renderProjects = (projects) => {
        let view = []
        projects.map(project => view.push(projectView(project)))
        return view
    }

    return (
        <Box {...props}>
            <Tabs
                colorScheme='cyan'
            >
                <TabList>
                    <Tab>Projects</Tab>
                    <Tab>Information</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel shadow='lg'>
                        <Box>
                            {renderProjects(res.response.data.projects)}
                        </Box>
                    </TabPanel>
                    <TabPanel>
                        <p>This is the information view</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

const projectView = (project) => {
    return (
        <Flex
            key={project.id}
            display='block'
            mb={10}
        >
            <Stack isInline>
                <Box>
                    <Text>
                        {project.name} 
                        <Badge colorScheme={project.status ? 'green' : 'red'} ml={1}>
                            {project.status ? 'Open' : 'Closed'}
                        </Badge>
                    </Text>
                </Box>
                <Box>
                    {project.updated_at}
                </Box>
            </Stack>
        </Flex>
    )
}