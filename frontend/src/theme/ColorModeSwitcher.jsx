import * as React from "react"
import {
  useColorMode,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react"
import { SunIcon, MoonIcon } from "@chakra-ui/icons"

export default function ColorModeSwitcher() {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue("dark", "light")
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon)

  return (
    <span style={{ zIndex: 99999, position: 'fixed', right: '10px', bottom: '10px'}}>
      <IconButton 
        // display={display}
        size="md"
        variant="ghost"
        color="current"
        mx={2}
        onClick={toggleColorMode}
        icon={<SwitchIcon />}
        aria-label= {`Switch to ${text} mode`}
      />
    </span>
  )
}
