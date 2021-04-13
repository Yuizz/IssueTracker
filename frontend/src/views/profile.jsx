import {
    Flex, Box, Text, Heading,
    Stack, Button,
    Avatar, Tabs, TabList, Tab, TabPanels,
    TabPanel, Badge, Spinner
} from '@chakra-ui/react';
import { useParams } from 'react-router';
import { useFetch } from '../hooks/useFetch';
import { formatDate } from '../utils/formatDate'
import { getToken } from '../utils/token'

export function ProfileView() {
    const { username } = useParams()

    const res = useFetch(`http://localhost:8000/profile/${username}`, {
        method:'GET',
        headers: {
            'Authorization': 'Token ' + getToken()
        }
    })

    if (res.isLoading || !res.response) return <div><Spinner /></div>
    if (res.response.errors) return <Heading>{res.response.errors.error}</Heading>
    
    return (
        <Flex h="100%" direction={{ base: 'column', md: 'row', lg: 'row' }}>
            <UserCard
                borderWidth={1}
                borderRadius={10}
                boxShadow="lg"
                py={5}
                px={10}
                maxW={{ md: '382px' }}
                minW={{md:'344px'}}
                w={{ base: '100%', md: '50%', lg: '35%' }}
                display={{ base: 'flex', md: 'block', lg: 'block' }}
                userData = {res.response.data}
            />
            <Container
                mt='5%'
                width='100%'
                projects = {res.response.data.projects}
            />
        </Flex>
    )
}

const UserCard = ({userData, ...props }) => {
    const firstName = userData.first_name
    const lastName = userData.last_name
    const username = userData.username
    const lastUpdateDate = formatDate(userData.updated_at)
    
    return (
        <Box {...props}>
            <Box my={5}>
                <Avatar src="../img/pngegg.png" size="2xl"></Avatar>
            </Box>
            <Box width="full">
                <Heading align='left'>{firstName} {lastName}</Heading>
                <Text fontSize='xl'
                    fontWeight='thin'
                    color='gray'
                    align='left'
                >{username}</Text>
                <Text>{ lastUpdateDate }</Text>
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

const Container = ({projects, ...props}) => {
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
                    <Tab>Proyectos</Tab>
                    <Tab>Información</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel shadow='lg'>
                        <Box>
                            {renderProjects(projects)}
                        </Box>
                    </TabPanel>
                    <TabPanel>
                        <p>Esta es la pestaña de informacion</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

const projectView = (project) => {
    const lastUpdate = formatDate(project.updated_at)

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
                    {lastUpdate}
                </Box>
            </Stack>
        </Flex>
    )
}