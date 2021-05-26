import {
  Avatar,
  Drawer, DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Link, Spinner, Stack, StackDivider, Text,
  useDisclosure,
} from "@chakra-ui/react"
import {useState} from "react"
import {useFetch} from "../hooks/useFetch";
import {getToken} from "../utils/token";
import {backendLink} from "../utils/links";

export function IssueDrawer(props){
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { issue, setIssue } = useState(null)

  const handleOpen = () => {
    onOpen()
    fetch(props.issue.url, {
      method: 'GET',
      headers: {
        'Authorization': 'Token ' + getToken(),
      }
    }).then(response => response.status === 201 ? onClose() : console.log('error'))
  }
  return(
    <>
      <Heading fontSize={'sm'}>
        <Link onClick={handleOpen}>{props.issue.title}</Link>
      </Heading>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton/>
            <DrawerHeader>
              <Heading size={'md'}>issue.title</Heading>
              <Text fontSize={'xs'} textColor={'gray.500'} mt={1}>Opened in issue.project</Text>
            </DrawerHeader>

            <DrawerBody>
              <Stack divider={<StackDivider borderColor="gray.300" />}>
                <Stack>
                  <Stack isInline>
                    <Avatar size={'sm'}/>
                    <Stack>
                      <Heading size={'xs'}>issue.author.username</Heading>
                      <Text fontSize={'xs'}>issue.created_at</Text>
                    </Stack>
                  </Stack>
                  <Text fontSize={'xs'}>
                    issue.description issue.description
                  issue.description issue.description
                  issue.description issue.description
                  issue.description issue.description
                  </Text>
                </Stack>
                <Stack>
                  <Text fontSize={'xs'} textColor={'gray.500'}>Assignees</Text>
                {/*  issue.assignees.map(assignee => {*/}
                {/*  return(*/}
                {/*    <Stack isInline>*/}
                {/*      <Avatar/>*/}
                {/*      <Text fontSize={'xs'}>assignee.username</Text>*/}
                {/*    </Stack>*/}
                {/*  )*/}
                {/*})*/}
                  <Text fontSize={'xs'}>assignee</Text>
                  <Text fontSize={'xs'}>assignee</Text>
                  <Text fontSize={'xs'}>assignee</Text>
                </Stack>

                <Stack>
                  <Text fontSize={'xs'} textColor={'gray.500'}>Labels</Text>
                </Stack>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}