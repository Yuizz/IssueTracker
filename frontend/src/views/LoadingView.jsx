import {Center, CircularProgress} from "@chakra-ui/react";

export default function LoadingView(){

  return(
    <Center height={'100vh'}>
      <CircularProgress isIndeterminate color="blue.300" />
    </Center>
  )
}
