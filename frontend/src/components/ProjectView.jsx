import {
  Box, Flex,
  Heading, Stack, StackDivider,
  Tag, Text, Tooltip
} from "@chakra-ui/react";
import {formatDate} from "../utils/formatDate";
import {IssueDrawer} from "./IssueDrawer";
import {labelColor} from "../utils/labelColor";
import {DrawerAddIssue} from "./drawers";
import {issueStatus} from "../utils/issueStatus";
import {Icon} from "@chakra-ui/icons";

export function ProjectView(props){
  return(
    <Box
      width={'full'}
      height={'full'}
    >
      <Stack isInline p={3} justifyContent={'space-between'}>
        <Heading>{props.project.name}</Heading>
        <DrawerAddIssue  projectId={props.project.id}/>
      </Stack>
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
                <Icon as={status.icon} color={status.color}></Icon>
            </Tooltip>

            {/*<Tag*/}

            {/*  // ml={5}*/}
            {/*>*/}
              {issue.label ? issue.label.name : ''}
            {/*</Tag>*/}
            <Stack>
              <IssueDrawer issue={issue}/>
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