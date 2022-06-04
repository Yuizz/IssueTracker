import {LinkIcon, CheckIcon, InfoOutlineIcon, QuestionOutlineIcon}
  from '@chakra-ui/icons'

const issueStatus = [
  {
    name: 'Undefined',
    color: 'gray',
    icon: QuestionOutlineIcon
  },
  {
    name: 'Open',
    color: 'green',
    icon: InfoOutlineIcon
  },
  {
    name: 'Closed',
    color: 'red',
    icon: CheckIcon
  },
  {
    name:'Merged',
    color:'purple',
    icon: LinkIcon
  }
]

export default issueStatus

// OPEN = 1, 'Open'
// CLOSED = 2, 'Closed'
// MERGED = 3, 'Merged'