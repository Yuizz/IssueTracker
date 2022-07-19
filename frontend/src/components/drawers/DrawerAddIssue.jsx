import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  Select,
  Textarea,
  FormControl,
  FormLabel,
  Stack,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { links, token } from "../../utils";
import { ErrorMessage } from "../";
import { CheckUsersBox } from "../checks";

export default function DrawerAddIssue({ projectId, reFetch, ...props }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const firstField = React.useRef();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [labelId, setLabelId] = useState(null);
  const [assignees, setAssignees] = useState([]);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const res = useFetch(links.backendLink("newissuedata", projectId), {
    method: "GET",
    headers: {
      Authorization: "Token " + token.getToken(),
    },
  });

  let labels = res.isLoading || !res.response ? [] : res.response.data.labels;
  let users = res.isLoading || !res.response ? [] : res.response.data.users;

  function handleClose(success = false) {
    onClose();
    setError("");
    setIsLoading(false);
    setAssignees([]);
    setLabelId(null);

    if (success === true) {
      reFetch();

      toast({
        title: "Issue creado.",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (title.length > 50) {
      setError("El título del issue no puede ser mayor a 50 caracteres.");
      return 0;
    }

    fetch(links.backendLink("issues"), {
      method: "POST",
      body: JSON.stringify({
        title: title,
        label_id: labelId ? labelId : null,
        description: desc,
        project: projectId,
        assignees: assignees,
      }),
      headers: {
        Authorization: "Token " + token.getToken(),
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 201) {
        handleClose(true);
      } else {
        setError("Error al crear el issue. Trata de nuevo.");
        setIsLoading(false);
      }
    });
  }

  return (
    <>
      <Button colorScheme="green" onClick={onOpen} {...props}>
        Nuevo Issue
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={handleClose}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
              Crear nuevo issue
            </DrawerHeader>

            <DrawerBody>
              <form id={"issue-form"} onSubmit={handleSubmit}>
                {error && <ErrorMessage message={error} />}

                <Stack spacing={"20px"}>
                  <FormControl id={"title"} isRequired>
                    <FormLabel>Título del issue</FormLabel>
                    <Input
                      ref={firstField}
                      onBlur={(event) => setTitle(event.target.value)}
                      placeholder={"Introduce el título del issue"}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel htmlFor="desc">Descripción</FormLabel>
                    <Textarea
                      placeholder={"Escribe la descripción del issue"}
                      onBlur={(event) => setDesc(event.target.value)}
                      resize={"none"}
                      size={"sm"}
                      height={"20vh"}
                      id={"desc"}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Etiqueta</FormLabel>
                    <Select
                      onChange={(event) => setLabelId(event.target.value)}
                      placeholder={"Selecciona una etiqueta"}
                    >
                      {labels.map((label) => {
                        return (
                          <option key={label.id} value={label.id}>
                            {label.name}
                          </option>
                        );
                      })}
                    </Select>
                  </FormControl>

                  <FormControl>
                    <CheckUsersBox
                      users={users}
                      assignees={assignees}
                      setAssignees={setAssignees}
                    />
                  </FormControl>
                </Stack>
              </form>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={handleClose}>
                Cancelar
              </Button>
              <Button
                type={"submit"}
                form={"issue-form"}
                isLoading={isLoading}
                loadingText={"Fetching..."}
                colorScheme="blue"
              >
                Crear
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
