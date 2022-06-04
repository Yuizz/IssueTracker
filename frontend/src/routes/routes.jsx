import { ProfileView } from '../views/profile/Profile'
import { LoginView } from '../views/login'
import { NotfoundPage } from '../views/NotfoundPage'

export const routes = {
  login: {path: '/login/', element: <LoginView/>},
  profile: { path: '/profile/:username/', element: <ProfileView/> },
  profileTab: { path: '/profile/:username/:project/', element: <ProfileView/> },

  notFound: { path:'/404/', element: <NotfoundPage/>}
}