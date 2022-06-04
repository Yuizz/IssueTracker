import { Box } from '@chakra-ui/layout';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import { routes } from './routes';
import { ColorModeSwitcher } from '../theme';

export function AppRouter() {
  return (
    <Box>
      <Box display={'flex'} justifyContent={'end'} padding="1em">
        <ColorModeSwitcher/>
      </Box>
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
