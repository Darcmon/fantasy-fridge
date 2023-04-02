import React, { useEffect, useState } from 'react';
import { Switch, RouteComponentProps, Route } from 'react-router-dom';

import AuthRoute from './components/AuthRoute/AuthRoute';
import { auth } from './config/firebase-config';
import logging from './config/logging';
import routes from './config/routes';

export interface IAppProps { }

const App: React.FC<IAppProps> = props => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user)
            {
                logging.info('User detected.');
            }
            else
            {
                logging.info('No user detected');
            }

            setLoading(false);
        })
    }, []);

    if (loading)
        return <h1>Loading</h1>

    return (
        <div>
            <Switch>
                {routes.map((route, index) => 
                    <Route
                        key={index}
                        path={route.path} 
                        exact={route.exact} 
                        render={(routeProps: RouteComponentProps<any>) => {
                            if (route.protected)
                                return <AuthRoute><route.component  {...routeProps} /></AuthRoute>;

                            return <route.component  {...routeProps} />;
                        }}
                    />)}
            </Switch>
        </div>
    );
}

export default App;