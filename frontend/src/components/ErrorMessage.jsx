import React from 'react'
import { Box, Alert, AlertDescription, AlertIcon} from "@chakra-ui/react";

export default function ErrorMessage({message}){
  return(
    <Box my={4}>
      <Alert status={'error'} borderRadius={10}>
        <AlertIcon/>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </Box>
  )
}