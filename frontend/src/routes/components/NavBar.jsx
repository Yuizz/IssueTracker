import { ReactNode, useContext } from "react";
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  Center,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { ColorModeSwitcher } from "../../theme";
import { UserContext } from "../../providers/AuthProvider";

const NavLink = ({ children, to }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    to={to}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
  >
    {children}
  </Link>
);

export default function NavBar() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { authContext, logout } = useContext(UserContext);
  const user = authContext.user;
  const onLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Text fontSize={"1.5rem"} fontWeight="bold">
              IssueTracker
            </Text>
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <ColorModeSwitcher />
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  padding={1}
                  minW={0}
                >
                  <Avatar size={"sm"} src={user.avatar_url} />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <Center margin={5}>
                    <Avatar size={"2xl"} src={user.avatar_url} />
                  </Center>
                  <Center>
                    <p>{user.username}</p>
                  </Center>
                  <MenuDivider />
                  <MenuItem>
                    <NavLink to={"/" + "jugo"}>My projects</NavLink>
                  </MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem onClick={onLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
