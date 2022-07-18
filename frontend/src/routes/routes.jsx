import { ProfileView } from "../views/profile/Profile";
import { LoginView } from "../views/LoginView";
import RegisterView from "../views/RegisterView";
import { NotfoundPage } from "../views/NotfoundPage";

export const routes = {
  login: { path: "/login/", element: <LoginView /> },
  register: { path: "/register/", element: <RegisterView /> },
  profile: { path: "/profile/:username/", element: <ProfileView /> },
  profileTab: {
    path: "/profile/:username/:project/",
    element: <ProfileView />,
  },

  notFound: { path: "/404/", element: <NotfoundPage /> },
};
