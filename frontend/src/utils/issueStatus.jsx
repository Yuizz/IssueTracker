import { CheckCircleIcon, WarningIcon, LinkIcon }
  from '@chakra-ui/icons'

export const issueStatus = [
  {
    name: 'Open',
    color: 'green',
    icon: WarningIcon
  },
  {
    name: 'Closed',
    color: 'red',
    icon: CheckCircleIcon
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