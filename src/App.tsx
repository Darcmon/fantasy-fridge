import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { MantineProvider, AppShell, Header, Footer } from "@mantine/core";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import { auth } from "./config/firebase-config";
import logging from "./config/logging";
import routes from "./config/routes";
import './App.scss'
import HeaderNav from "./components/HeaderNav/HeaderNav";
import { User } from "firebase/auth";
import FooterDetails from "./components/FooterDetails/FooterDetails";

export interface IAppProps {}

const App: React.FC<IAppProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null as any);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        logging.info("User detected.");
        setUser(user);
      } else {
        logging.info("No user detected");
        setUser(user);
      }

      setLoading(false);
    });
  }, [user]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <MantineProvider withGlobalStyles withNormalizeCSS>
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
                      <AppShell
                      header={<Header height={150} p="xs" fixed={true}><HeaderNav user={user} /></Header>}
                      footer={<FooterDetails/>}
                      >
                      
                      <div className="component--padding">
                      <Component user={user} />
                      </div>
                      </AppShell>
                    </AuthRoute>
                  ) : (
                    <Component />
                  )
                }
              />
            );
          })}
        </Routes>
      </MantineProvider>
    </div>
  );
};

export default App;
