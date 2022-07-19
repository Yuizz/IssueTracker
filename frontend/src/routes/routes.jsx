import { ProfileView } from "../views/profile/Profile";
import { LoginView } from "../views/LoginView";
import RegisterView from "../views/RegisterView";
import { NotfoundPage } from "../views/NotfoundPage";
import { LoadingElement } from "../components";

export const routes = {
  home: { path: "/", element: <LoadingElement /> },
  login: { path: "/login/", element: <LoginView /> },
  register: { path: "/register/", element: <RegisterView /> },
  profile: { path: "/:username/", element: <ProfileView /> },
  profileTab: {
    path: "/:username/:project/",
    element: <ProfileView />,
  },

  notFound: { path: "/404/", element: <NotfoundPage /> },
};
