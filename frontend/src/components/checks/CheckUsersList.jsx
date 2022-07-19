import {
  VStack,
  Avatar,
  Heading,
  Text,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { CheckElement } from ".";

export default function CheckUsersList({ users, assignees, setAssignees }) {
  return (
    <VStack spacing={0} divider={<StackDivider borderColor="gray.200" />}>
      {users.map((user) => {
        return (
          <CheckElement
            key={user.id}
            value={user.id}
            list={assignees}
            setList={setAssignees}
            py={0.5}
            px={5}
          >
            <Stack isInline>
              <Avatar size={"xs"} src={user.avatar_url} />
              <Heading fontSize={"sm"}>{user.username}</Heading>
              <Text fontSize={"xs"}>
                {user.first_name} {user.last_name}
              </Text>
            </Stack>
          </CheckElement>
        );
      })}
    </VStack>
  );
}
