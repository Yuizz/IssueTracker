import {
    Flex, Box, Text, Heading,
    Stack, Button,
    Avatar, Tabs, TabList, Tab, TabPanels,
    TabPanel, Badge, Spinner
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export function Home() {
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
            />
            <Container
                mt='5%'
                width='100%'
            />
        </Flex>
    )
}

const UserCard = (props) => {
    return (
        <Box {...props}>
            <Box my={5}>
                <Avatar src="../img/pngegg.png" size="2xl"></Avatar>
            </Box>
            <Box width="full">
                <Heading>Nombre Apellido</Heading>
                <Text>Username</Text>
                <Button
                    mt={4}
                    width={{ base: 'max-content', md: 'full', lg: 'full' }}
                    alignSelf="flex-start"
                >
                    Cambiar datos
                </Button>
            </Box>
        </Box>
    )
}

const Container = (props) => {
    const [projects, setProjects] = useState()
    const [issues, setIssues] = useState()

    useEffect(()=>{
        fetch("http://localhost:8000/projects/", {
            method:'GET',
            headers: {
                'Authorization': 'Token ' + '4f30ddf84d08abfc7f1244e273a1acb7303f2bb3'
            }
        })
        .then(response => response.json())
        .then(data=> setProjects(data))
    }, [])

    useEffect(()=>{
        fetch("http://localhost:8000/issues/", {
            method:'GET',
            headers: {
                'Authorization': 'Token ' + '4f30ddf84d08abfc7f1244e273a1acb7303f2bb3'
            }
        })
        .then(response => response.json())
        .then(data=> setIssues(data))
    }, [])

    const renderProjects = () => {
        let view = []
        projects.data.forEach(project => view.push(projectView(project)))
        return view
    }

    const renderIssues = () => {
        let view = []
        issues.data.forEach(issue => view.push(issueView(issue)))
        return view
    }

    return (
        <Box {...props}>
            <Tabs
                colorScheme='cyan'
            >
                <TabList>
                    <Tab>Information</Tab>
                    <Tab>Projects</Tab>
                    <Tab>Issues</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <p>This is the information view</p>
                    </TabPanel>
                    <TabPanel shadow='lg'>
                        <Box>
                            {projects !== undefined ? renderProjects() : <Text><Spinner/></Text>}
                        </Box>
                    </TabPanel>
                    <TabPanel>
                            {issues !== undefined ? renderIssues() : <Text><Spinner/></Text>}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

const projectView = (project) => {
    console.log(project)
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

const issueView = (issue) => {
    console.log(issue)
    return (
        <Flex
            key={issue.id}
            display='block'
            mb={10}
            height='content'
        >
            <Stack isInline>
                <Box>
                    <Text
                        fontWeight='bold'

                    >
                        <Badge colorScheme={issue.status ? 'green' : 'red'} mr={3}>
                            {issue.status ? 'Open' : 'Closed'}
                        </Badge>
                        {issue.title}
                    </Text>
                </Box>
                <Box>
                </Box>
            </Stack>
        </Flex>
    )
}