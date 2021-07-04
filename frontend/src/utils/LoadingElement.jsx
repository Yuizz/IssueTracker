import {Center, CircularProgress} from "@chakra-ui/react";

export function LoadingElement(){

  return(
    <Center height={'100vh'}>
      <CircularProgress isIndeterminate color="blue.300" />
    </Center>
  )
}