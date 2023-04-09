import React, { useEffect, useState } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { MantineProvider, Tabs, Badge } from "@mantine/core";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import { auth, db } from "./config/firebase-config";
import { collection, setDoc, getDocs } from "firebase/firestore";
import logging from "./config/logging";
import routes from "./config/routes";
import KitchenIcon from "@mui/icons-material/Kitchen";
import './App.scss'

export interface IAppProps {}

const App: React.FC<IAppProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

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
                      {/* <div className='anim_gradient'></div> */}
                      <Component user={auth.currentUser} />
                      
                      <Tabs defaultValue="home" variant="pills" radius="xs">
                        <Tabs.List>
                          <Tabs.Tab value="Home" onClick={() => navigate('/')}>Home</Tabs.Tab>
                          <Tabs.Tab value="fridge" onClick={() => navigate('/fridge')}icon={<KitchenIcon />}>
                            Fridge
                          </Tabs.Tab>
                          <Tabs.Tab value="ingredients" onClick={() => navigate('/ingredients')}>Ingredients</Tabs.Tab>
                          <Tabs.Tab
                            rightSection={
                              <Badge
                                w={32}
                                h={32}
                                sx={{ pointerEvents: "none" }}
                                variant="filled"
                                size="xl"
                                p={0}
                              >
                                6
                              </Badge>
                            }
                            value="cookbook"
                          >
                            Cookbook Search
                          </Tabs.Tab>
                        </Tabs.List>
                      </Tabs>
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
