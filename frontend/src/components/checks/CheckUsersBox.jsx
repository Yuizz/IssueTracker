import { Box, Stack, FormLabel } from "@chakra-ui/react";
import { CheckUsersList } from ".";

export default function CheckUsersBox({ users, assignees, setAssignees }) {
  return (
    <Box h="100%" w="100%">
      <Stack isInline justifyContent={"space-between"}>
        <FormLabel>Asignar usuarios</FormLabel>
      </Stack>
      <CheckUsersList
        users={users}
        assignees={assignees}
        setAssignees={setAssignees}
      />
    </Box>
  );
}
