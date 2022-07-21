import {
  Flex,
  Box,
  Text,
  Heading,
  Stack,
  Button,
  Avatar,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Tag,
  StackDivider,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { DrawerAddProject } from "../../components/drawers";
import { useFetch } from "../../hooks/useFetch";
import { links, token, formatDate } from "../../utils";
import ProjectView from "./ProjectView";
import { LoadingElement } from "../../components";

export function ProfileView() {
  const params = useParams();

  const res = useFetch(links.backendLink("profile", params.username), {
    method: "GET",
    headers: {
      Authorization: "Token " + token.getToken(),
    },
  });

  if (res.isLoading || !res.response) return <LoadingElement />;
  if (res.response.errors)
    return <Heading>{res.response.errors.error}</Heading>;
  const userCanEdit = res.response.links.canEdit;

  return (
    <Flex h="100%" direction={{ base: "column", md: "row", lg: "row" }}>
      <UserCard
        py={5}
        px={10}
        maxW={{ md: "382px" }}
        minW={{ md: "344px" }}
        w={{ base: "100%", md: "50%", lg: "35%" }}
        height="full"
        display={{ base: "flex", md: "block", lg: "block" }}
        userData={res.response.data}
        align="center"
        canEdit={userCanEdit}
      />
      <Container
        mt="1%"
        width="100%"
        height="100vh"
        projects={res.response.data.projects}
        params={params}
        reFetchProjects={res.reFetch}
        canEdit={userCanEdit}
      />
    </Flex>
  );
}

const UserCard = ({ userData, canEdit, ...props }) => {
  const firstName = userData.first_name;
  const lastName = userData.last_name;
  const username = userData.username;
  const avatarUrl = userData.avatar_url;

  return (
    <Box {...props}>
      <Box my={5}>
        <Avatar
          src={avatarUrl}
          name={"User Avatar"}
          size={{ base: "xl", md: "2xl" }}
        />
      </Box>
      <Box width="full" ml={{ base: 10, md: 0 }} verticalAlign={"middle"}>
        <Heading align="left" size={"md"}>
          {firstName} {lastName}
        </Heading>
        <Text
          fontSize={{ base: "md", lg: "xl" }}
          fontWeight="thin"
          color="gray"
          align="left"
        >
          {username}
        </Text>

        {canEdit ? (
          <Button
            mt={4}
            width={{ base: "max-content", md: "full", lg: "full" }}
            variant={"outline"}
          >
            Cambiar datos
          </Button>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

const Container = ({
  projects,
  params,
  reFetchProjects,
  canEdit,
  ...props
}) => {
  return (
    <Box {...props}>
      <Tabs colorScheme={"blue"}>
        <TabList>
          <Tab id={"projects"}>Proyectos</Tab>
          <Tab id={"information"}>Información</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {!params.project ? (
              <Projects
                projects={projects}
                reFetchProjects={reFetchProjects}
                canEdit={canEdit}
              />
            ) : (
              <ProjectView
                projects={projects}
                reFetchProjects={reFetchProjects}
                canEdit={canEdit}
              />
            )}
          </TabPanel>
          <TabPanel>
            <p>Esta es la pestaña de información</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

function Projects({ projects, reFetchProjects, canEdit, ...props }) {
  return (
    <>
      <Stack isInline p={3}>
        {canEdit ? <DrawerAddProject reFetch={reFetchProjects} /> : ""}
      </Stack>
      <Box borderWidth={1} borderRadius={10} p={5}>
        <Stack divider={<StackDivider borderColor="gray.200" />}>
          {projects.map((project, index) => {
            const lastUpdate = formatDate(project.updated_at);

            return (
              <Flex key={project.id} height={12} width={"full"} mb={5}>
                <Stack>
                  <Stack isInline>
                    <Heading fontSize="xl">
                      <Link to={`${project.id}`}>{project.name}</Link>
                    </Heading>
                    <Tag colorScheme={project.status ? "green" : "red"} ml={1}>
                      {project.status ? "Abierto" : "Cerrado"}
                    </Tag>
                  </Stack>
                  <Text fontSize="sm">Ultima actualización {lastUpdate}</Text>
                </Stack>
              </Flex>
            );
          })}
        </Stack>
      </Box>
    </>
  );
}
