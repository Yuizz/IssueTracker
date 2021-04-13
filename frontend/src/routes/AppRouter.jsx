import { Box } from '@chakra-ui/layout';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { routes } from './routes';

export function AppRouter() {
    return (
        <Box d="flex" flexDirection="column" minH="100vh">
            <Router>
                <Box h='100%' d='flex' flexGrow={1} flexDirection='column'>
                    <Switch>
                        <Route exact path={routes.login.path} component={routes.login.component} />
                        <Route exact path={routes.profile.path} component={routes.profile.component}/>
                        <Route exact path={routes.notFound.path} component={routes.notFound.component} />
                        <Redirect to={routes.notFound.path}/>
                    </Switch>
                </Box>
            </Router>
        </Box>
    );
}
