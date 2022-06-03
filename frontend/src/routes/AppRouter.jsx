import { Box } from '@chakra-ui/layout';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import { routes } from './routes';

export function AppRouter() {
  return (
    <Box d="flex" flexDirection="column" minH="100vh">
      <Router>
        <Box h='100%' d='flex' flexGrow={1} flexDirection='column'>
          <Routes>
            <Route exact path={routes.login.path} element={routes.login.element} />
            <Route exact path={routes.profileTab.path} element={routes.profileTab.element}/>
            <Route exact strict path={routes.profile.path} element={routes.profile.element}/>
            <Route exact path={routes.notFound.path} element={routes.notFound.element} />
            <Route path="*" element={ <Navigate to={routes.notFound.path}/> }/>
            
          </Routes>
        </Box>
      </Router>
    </Box>
  );
}
