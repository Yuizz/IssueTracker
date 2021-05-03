import {
    Flex, Box, Text, Heading,
    Stack, Button,
    Avatar, Tabs, TabList, Tab, TabPanels,
    TabPanel, AddIcon, Spinner, Tag, StackDivider, Link
} from '@chakra-ui/react'
import { useParams } from 'react-router'
import { DrawerAddProject } from '../components/drawers'
import { useFetch } from '../hooks/useFetch'
import { formatDate } from '../utils/formatDate'
import { getToken } from '../utils/token'
import { backendLink } from '../utils/links'

export function ProfileView() {
    const { username } = useParams()

    const res = useFetch(backendLink('profile', username), {
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
                py={5}
                px={10}
                maxW={{ md: '382px' }}
                minW={{md:'344px'}}
                w={{ base: '100%', md: '50%', lg: '35%' }}
                height='full'
                display={{ base: 'flex', md: 'block', lg: 'block' }}
                userData={res.response.data}
                align='center'
            />
            <Container
                mt='5%'
                width='100%'
                height='100vh'
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
                <Avatar
                    src="../img/pngegg.png"
                    src='https://avatars.githubusercontent.com/u/74507310?s=400&u=de466080d41a7cf4fb7dfd5cad93d479c22a2de4&v=4'
                    size="3xl" ></Avatar>
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
                    variant='outline'
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
                    <TabPanel>
                        <Stack
                            isInline
                            p={3}
                            alignItems='end'
                        >
                            <DrawerAddProject/>
                        </Stack>

                        <Box
                            borderWidth={1}
                            borderRadius={10}
                            p={5}
                        >
                            <Stack
                                divider={<StackDivider borderColor="gray.200" />}
                            >
                                {renderProjects(projects)}
                            </Stack>
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
            height={12}
            mb={5}
        >
            <Stack>
                <Box>
            {/* TODO una vista para el proyecto dentro de la tab */}
                    <Heading fontSize="xl">
                        <Link src={project.url}>{project.name}</Link> 
                        <Tag colorScheme={project.status ? 'green' : 'red'} ml={1}>
                            {project.status ? 'Abierto' : 'Cerrado'}
                        </Tag>
                    </Heading>
                </Box>
                <Text fontSize="sm">Ultima actualización {lastUpdate}</Text>
            </Stack>
        </Flex>
    )
}