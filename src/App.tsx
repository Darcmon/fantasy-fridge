import React, { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";

import AuthRoute from "./components/AuthRoute/AuthRoute";
import { auth } from "./config/firebase-config";
import logging from "./config/logging";
import routes from "./config/routes";

export interface IAppProps {}

const App: React.FC<IAppProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        logging.info("User detected.");
      } else {
        logging.info("No user detected");
      }

      setLoading(false);
    });
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <Routes>
        {routes.map((route, index) => {
          const Component = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                route.protected ? (
                  <AuthRoute>
                    <Component />
                  </AuthRoute>
                ) : (
                  <Component />
                )
              }
            />
          );
        })}
      </Routes>
    </div>
  );
};

export default App;
