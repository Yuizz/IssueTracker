import {LinkBox, LinkOverlay} from "@chakra-ui/react";
import {useState, useEffect} from "react";

export function CheckElement({list, setList, value, ...props}){
  const [isChecked, setIsChecked] = useState(list.includes(value))

  useEffect(()=>{
    if(isChecked){
      let copyList = list
      copyList.push(value)
      setList(copyList)
    }
    if(!isChecked){
      const copyList = list.filter((v) => v !== value)
      setList(copyList)
    }
  },[isChecked])

  const handleClick = (event) => {
    event.preventDefault()
    setIsChecked(!isChecked)
  }

  return(
    <LinkBox
        onClick={handleClick}
         borderRadius={0}
         backgroundColor={isChecked ? 'blue.500' : ''}
         textColor={isChecked ? 'white' : ''}
         width={'full'}
         height={'max-content'}
      {...props}>
      <LinkOverlay/>
      {props.children}
    </LinkBox>
  )
}