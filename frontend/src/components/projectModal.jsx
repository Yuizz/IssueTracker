import {
  Badge,
  Flex,
  Heading, Link,
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, StackDivider, Tag, Text,
  useDisclosure
} from "@chakra-ui/react";
import {formatDate} from "../utils/formatDate";
import {DrawerAddProject} from "./drawers";

export function ProjectModal({project}){
  const { isOpen, onOpen, onClose } = useDisclosure()

  return(
    <>
      <Heading fontSize='xl'>
        <Link onClick={onOpen}>{project.name}</Link>
      </Heading>

      <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader fontSize={'4xl'}> {project.name}</ModalHeader>
          <ModalCloseButton/>

          <ModalBody>
            <Stack divider={<StackDivider borderColor="gray.200" />}>

              {project.issues.map(issue => {
                const lastUpdate = formatDate(issue.updated_at)
                return(
                  <Flex
                    key={issue.id}
                    height={8}
                    width={'full'}
                    mb={5}
                  >
                    <Stack>
                      <Stack isInline>
                        <Heading fontSize={'md'}>{issue.title}</Heading>
                        <Badge ml={5}>{issue.label}</Badge>
                      </Stack>
                      <Text fontSize="sm">Ultima actualización {lastUpdate}</Text>
                    </Stack>
                  </Flex>
                )
              })}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}