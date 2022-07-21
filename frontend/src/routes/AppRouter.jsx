import { Box } from "@chakra-ui/layout";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import { routes } from "./routes";
import { useContext } from "react";
import { UserContext } from "../providers/AuthProvider";
import LoadingView from "../views/LoadingView";
import NavBar from "./components/NavBar";

export function AppRouter() {
  const { authContext } = useContext(UserContext);

  return (
    <Box>
      {authContext.isLoading ? (
        <LoadingView />
      ) : (
        <>
          <Router>
            {authContext.user ? <NavBar /> : null}
            <Box h="100%" d="flex" flexGrow={1} flexDirection="column">
              <Routes>
                {Object.keys(routes).map((key) => {
                  const path = routes[key].path;
                  let element = routes[key].element;
                  if (key === "login" && authContext.isLoggedIn) {
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
