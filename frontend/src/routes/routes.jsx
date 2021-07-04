import { ProfileView } from '../views/Profile'
import { LoginView } from '../views/login'
import { NotfoundPage } from '../views/NotfoundPage'

export const routes = {
  login: {path: '/login/', component: LoginView},
  profile: { path: '/profile/:username/', component: ProfileView },
  profileTab: { path: '/profile/:username/:project/', component: ProfileView },

  notFound: { path:'/404/', component: NotfoundPage}
}