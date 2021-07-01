import {
  Flex, Box, Text, Heading,
  Stack, Button,
  Avatar, Tabs, TabList, Tab, TabPanels,
  TabPanel, Spinner, Tag, StackDivider, Link
} from '@chakra-ui/react'
import { useParams } from 'react-router'
import { DrawerAddProject } from '../components/drawers'
import { useFetch } from '../hooks/useFetch'
import { formatDate } from '../utils/formatDate'
import { getToken } from '../utils/token'
import { backendLink } from '../utils/links'
import { ProjectView } from "../components/ProjectView"

export function ProfileView() {
  const params = useParams()

  const res = useFetch(backendLink('profile', params.username), {
    method:'GET',
    headers: {
      'Authorization': 'Token ' + getToken()
    }
  })

  if (res.isLoading || !res.response) return <div align='center'><Spinner /></div>
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
        params={params}
      />
    </Flex>
  )
}

const UserCard = ({userData, ...props }) => {
  const firstName = userData.first_name
  const lastName = userData.last_name
  const username = userData.username
  const avatarUrl = userData.avatar_url

  return (
    <Box {...props}>
      <Box my={5}>
        <Avatar
          src={avatarUrl}
          size="3xl" >
        </Avatar>
      </Box>
      <Box
        width='full'
        ml={{base:10, md:0}}
      >
        <Heading
          align='left'
        >{firstName} {lastName}</Heading>
        <Text fontSize='xl'
              fontWeight='thin'
              color='gray'
              align='left'
        >{username}</Text>
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

const Container = ({projects, params, ...props}) => {
  return (
    <Box {...props}>
      <Tabs
        colorScheme='cyan'
      >
        <TabList>
          <Tab id={'projects'}>Proyectos</Tab>
          <Tab id={'information'}>Información</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {!params.tab ? <Projects projects={projects}/> : <ProjectView project={projects[params.tab]}/>}

          </TabPanel>
          <TabPanel>
            <p>Esta es la pestaña de información</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

function Projects(props) {
  return(
    <>
      <Stack
        isInline
        p={3}
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
          {props.projects.map(project=>projectCard(project))}
        </Stack>
      </Box>
    </>
  )
}

const projectCard = (project) => {
  const lastUpdate = formatDate(project.updated_at)

  return (
    <Flex
      key={project.id}
      height={12}
      width={'full'}
      mb={5}
    >
      <Stack>
        <Stack isInline>
          {/* TODO una vista para el proyecto dentro de la tab */}
                  <Heading fontSize="xl">
                      <Link >{project.name}</Link>
                  </Heading>
          <Tag colorScheme={project.status ? 'green' : 'red'} ml={1}>
            {project.status ? 'Abierto' : 'Cerrado'}
          </Tag>
        </Stack>
        <Text fontSize="sm">Ultima actualización {lastUpdate}</Text>
      </Stack>
    </Flex>
  )
}