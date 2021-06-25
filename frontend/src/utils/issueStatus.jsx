import { LinkIcon, CheckIcon, InfoOutlineIcon }
  from '@chakra-ui/icons'

export const issueStatus = [
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

// OPEN = 1, 'Open'
// CLOSED = 2, 'Closed'
// MERGED = 3, 'Merged'