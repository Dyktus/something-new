import {
  mdiAccountCircle,
  mdiMonitor,
  mdiDomain,
} from '@mdi/js'

export default [
  {
    to: '/dashboard',
    icon: mdiMonitor,
    label: 'Dashboard',
  },
  {
    to: '/profile',
    label: 'Profile',
    icon: mdiAccountCircle,
  },
  {
    to: '/team',
    label: 'My Team',
    icon: mdiDomain,
  }
]
