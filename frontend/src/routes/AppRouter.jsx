import { Box } from "@chakra-ui/layout";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import { routes } from "./routes";
import { ColorModeSwitcher } from "../theme";
import { useContext } from "react";
import { UserContext } from "../providers/AuthProvider";
import LoadingView from "../views/LoadingView";

export function AppRouter() {
  const { authContext } = useContext(UserContext);

  return (
    <Box>
      {authContext.isLoading ? (
        <LoadingView />
      ) : (
        <>
          <ColorModeSwitcher />
          <Router>
            <Box h="100%" d="flex" flexGrow={1} flexDirection="column">
              <Routes>
                {Object.keys(routes).map((key) => {
                  const path = routes[key].path;
                  let element = authContext.isLoggedIn ? (
                    routes[key].element
                  ) : (
                    <Navigate to="login" />
                  );
                  if (
                    (key === "login" || key === "home") &&
                    authContext.isLoggedIn
                  ) {
                    element = <Navigate to={"/" + authContext.user.username} />;
                  }
                  return <Route key={key} path={path} element={element} />;
                })}
              </Routes>
            </Box>
          </Router>
        </>
      )}
    </Box>
  );
}
