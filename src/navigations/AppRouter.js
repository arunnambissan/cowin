import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppContainer from "../layout/AppContainer";

export default ({ routes, name }) => {
    return <Router>
        <AppContainer>
            <Switch>
                {routes.map(route => <Route exact key={route.path} path={route.path}>
                    {route.element}
                </Route>)}
            </Switch>
        </AppContainer>
    </Router>
}