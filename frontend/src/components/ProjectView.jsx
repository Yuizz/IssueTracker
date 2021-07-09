import {
  Box, Center, Flex,
  Heading, Spinner, Stack, StackDivider,
  Tag, Text, Tooltip
} from "@chakra-ui/react";
import { useParams } from 'react-router'
import {formatDate} from "../utils/formatDate";
import {IssueDrawer} from "./IssueDrawer";
import {labelColor} from "../utils/labelColor";
import {DrawerAddIssue} from "./drawers";
import {issueStatus} from "../utils/issueStatus";
import {Icon} from "@chakra-ui/icons";
import {useFetch} from "../hooks/useFetch";
import {getToken} from "../utils/token";
import {LoadingElement} from "../utils/LoadingElement";

export function ProjectView({projects, ...props}){
  const params = useParams()

  const query = projects[params.project-1].url

  const res = useFetch(query, {
    method:'GET',
    headers: {
      'Authorization': 'Token ' + getToken()
    }
  })

  if (res.isLoading || !res.response) return <LoadingElement/>
  if (res.response.errors) return <Heading>{res.response.errors.error}</Heading>

  const project = res.response.data
  return(
    <Box
      width={'full'}
      height={'full'}
    >
      <Stack isInline p={3} justifyContent={'space-between'}>
        <Heading>{project ? project.name : ''}</Heading>
        <DrawerAddIssue  projectId={project ? project.id : ''} trigger={res.setTrigger}/>
      </Stack>
      <Box
        borderWidth={1}
        borderRadius={10}
        p={5}
      >
        <Stack
          divider={<StackDivider borderColor="gray.200" />}
        >
          {project ? project.issues.map(issue=>issueCard(issue, res.setTrigger)) : ''}
        </Stack>
      </Box>
    </Box>
  )
}

const issueCard = (issue, trigger) => {
  const lastUpdate = formatDate(issue.updated_at)
  const status = issueStatus[issue.status-1]

  return(
    <Flex
      key={issue.id}
      height={'auto'}
      width={'full'}
    >
      <Stack isInline>
        <Stack>
          <Stack isInline>
            <Tooltip hasArrow label={status.name} placement={'left'}>
                <Icon as={status.icon} color={status.color}/>
            </Tooltip>
              {issue.label ? issue.label.name : ''}
            <Stack>
              <IssueDrawer issue={issue} trigger={trigger}/>
              <Tag
                colorScheme={issue.label ? labelColor[issue.label.name] : ''}
                borderRadius={20}
                width={'max-content'}
              >{issue.label ? issue.label.name : ''}</Tag>
            </Stack>
          </Stack>
          <Text fontSize={'xs'} textColor={'gray.500'}>Ultima actualización {lastUpdate}</Text>
        </Stack>
      </Stack>
    </Flex>
  )
}