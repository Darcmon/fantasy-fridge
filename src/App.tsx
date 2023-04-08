import React, { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { MantineProvider, Tabs, Badge } from "@mantine/core";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import { auth, db } from "./config/firebase-config";
import { collection, setDoc, getDocs } from "firebase/firestore";
import logging from "./config/logging";
import routes from "./config/routes";
import KitchenIcon from "@mui/icons-material/Kitchen";

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
                      <Component user={auth.currentUser} />
                      <Tabs defaultValue="home" variant="pills" radius="xs">
                        <Tabs.List>
                          <Tabs.Tab value="Home">Home</Tabs.Tab>
                          <Tabs.Tab value="fridge" icon={<KitchenIcon />}>
                            Fridge
                          </Tabs.Tab>
                          <Tabs.Tab value="ingredients">Ingredients</Tabs.Tab>
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

// import React, { useEffect, useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import { MantineProvider, Tabs, Badge } from "@mantine/core";
// import AuthRoute from "./components/AuthRoute/AuthRoute";
// import { auth, db } from "./config/firebase-config";
// import logging from "./config/logging";
// import routes from "./config/routes";
// import KitchenIcon from "@mui/icons-material/Kitchen";
// import { Firestore } from "firebase/firestore";


// export interface IAppProps {
 
// }

// const App: React.FC<IAppProps> = (props) => {
//   const [loading, setLoading] = useState<boolean>(true);
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((authUser) => {
//       if (authUser) {
//         logging.info("User detected.");
//         const { uid, email } = authUser;

//         try {
//           const userRef = db.collection("users").doc(uid);
//           userRef.set({ email }, { merge: true });
//           logging.info("User added to Firestore.");
//         } catch (error) {
//           logging.error("Error adding user to Firestore: ", error);
//         }

//         setUser(authUser);
//       } else {
//         logging.info("No user detected");
//         setUser(null);
//       }

//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   if (loading) return <h1>Loading...</h1>;

//   return (
//     <div>
//       <MantineProvider withGlobalStyles withNormalizeCSS>
//         <Routes>
//           {routes.map((route, index) => {
//             const Component = route.component;
//             return (
//               <Route
//                 key={index}
//                 path={route.path}
//                 element={
//                   route.protected ? (
//                     <AuthRoute>
//                       <Component user={user} />
//                       <Tabs defaultValue="home" variant="pills" radius="xs">
//                         <Tabs.List>
//                           <Tabs.Tab value="Home">Home</Tabs.Tab>
//                           <Tabs.Tab value="fridge" icon={<KitchenIcon />}>
//                             Fridge
//                           </Tabs.Tab>
//                           <Tabs.Tab value="ingredients">Ingredients</Tabs.Tab>
//                           <Tabs.Tab
//                             rightSection={
//                               <Badge
//                                 w={32}
//                                 h={32}
//                                 sx={{ pointerEvents: "none" }}
//                                 variant="filled"
//                                 size="xl"
//                                 p={0}
//                               >
//                                 6
//                               </Badge>
//                             }
//                             value="cookbook"
//                           >
//                             Cookbook Search
//                           </Tabs.Tab>
//                         </Tabs.List>
//                       </Tabs>
//                     </AuthRoute>
//                   ) : (
//                     <Component />
//                   )
//                 }
//               />
//             );
//           })}
//         </Routes>
//       </MantineProvider>
//     </div>
//   );
// };

// export default App;
