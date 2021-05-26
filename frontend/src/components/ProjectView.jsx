import {
  Badge, Box, Flex,
  Heading, Stack, StackDivider,
  Tag, Text
} from "@chakra-ui/react";
import {formatDate} from "../utils/formatDate";
import {IssueDrawer} from "./IssueDrawer";

export function ProjectView(props){
  return(
    <Box
      width={'full'}
      height={'full'}
    >
      <Heading>{props.project.name}</Heading>
      <Box
        borderWidth={1}
        borderRadius={10}
        p={5}
      >
        <Stack
          divider={<StackDivider borderColor="gray.200" />}
        >
          {props.project.issues.map(issue=>issueCard(issue))}
        </Stack>
      </Box>
    </Box>
  )
}

const issueCard = (issue) => {
  const lastUpdate = formatDate(issue.updated_at)

  return(
    <Flex
      key={issue.id}
      height={'auto'}
      width={'full'}
    >
      <Stack isInline>
        <Stack>
          <Stack isInline>
            {/*<Heading fontSize={'sm'}>{issue.title}</Heading>*/}
            <IssueDrawer issue={issue}/>
            <Tag ml={5}>{issue.label}</Tag>
          </Stack>
          <Text fontSize={'xs'} textColor={'gray.500'}>Ultima actualización {lastUpdate}</Text>
        </Stack>
      </Stack>
    </Flex>
  )
}