import React from "react"
import {
  Button, useDisclosure,
  AlertDialog, AlertDialogOverlay, AlertDialogContent,
  AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter
} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";

// eslint-disable-next-line no-undef
export default function DeleteAlertDialog({onConfirmation, isDisabled=false, title='¿Estas seguro?', message='', ...props}){
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  return (
    <>
      <Button colorScheme={'red'}
              rightIcon={<DeleteIcon/>}
              onClick={onOpen}
              isDisabled={isDisabled}
        >Borrar</Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {message}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={onConfirmation}>
              Si
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}