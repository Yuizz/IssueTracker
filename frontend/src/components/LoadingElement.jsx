import {Center, CircularProgress} from "@chakra-ui/react";

export default function LoadingElement(){

  return(
    <Center height={'100vh'}>
      <CircularProgress isIndeterminate color="blue.300" />
    </Center>
  )
}