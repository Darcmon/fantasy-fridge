import React from "react";
import { Link } from "react-router-dom";
import { db } from "../config/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import IPageProps from "../interfaces/page";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import KitchenIcon from "@mui/icons-material/Kitchen";
import EggIcon from "@mui/icons-material/Egg";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";



const HomePage: React.FC<IPageProps> = (props) => {
  const API_KEY = import.meta.env.VITE_SPOON_API_KEY;
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const { user } = props;
  console.log(user.uid);
  
  React.useEffect(() => {
    (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
  }, [value]);

  // Spoonacular API
  const [instructions, setInstructions] = React.useState("");
  React.useEffect(() => {
    async function fetchData() {
      const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=1&addRecipeInformation=true&instructionsRequired=true&query=chicken`)
      
      const json = await data.json()
      console.log(json);
      setInstructions(JSON.stringify(json.results[0].analyzedInstructions[0].steps))
    }
    fetchData()
  })

  // Firestore API GROUP
  // const [firestoreGroupData, setFirestoreGroupData] = React.useState("");
  // const fridgeRef = collectionGroup(db, "fridge");
  // const userRef = collection(db, "users");
  // React.useEffect(() => {
  //   async function fetchData() {
  //     const querySnapshot = await getDocs(fridgeRef);
  //     console.log(querySnapshot);
      
  //     querySnapshot.docs.forEach((doc) => {
  //       setFirestoreGroupData(JSON.stringify(doc.data()));
  //     });
  //   }
  //   fetchData()
  // }, []);

  // Firestore API single get
  const userFridgeRef = collection(db, "users", user.uid, "fridge");
  const [firestoreData, setFirestoreData] = React.useState("");
  
  React.useEffect(() => {
  async function fetchData() {
    const querySnapshot = await getDocs(userFridgeRef);
    console.log(querySnapshot);
    
    querySnapshot.docs.forEach((doc) => {
      console.log(doc.data());
      
      setFirestoreData(JSON.stringify(doc.data()));
    });
  }
  fetchData()
}, []);


  console.log(firestoreData);
  
  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <p>Welcome to this page that is protected by Firebase</p>

      <p>
        Click <Link to="/logout">here</Link> to logout.
      </p>

      UID: <p>{user.uid}</p>
      
      Fridge: <p>{firestoreData}</p>
      <p>
      {instructions}
      </p>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Home" icon={<FoodBankIcon />} />
          <BottomNavigationAction label="Fridge" icon={<KitchenIcon />} />
          <BottomNavigationAction label="Ingredients" icon={<EggIcon />} />
          <BottomNavigationAction label="Cook" icon={<MenuBookIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default HomePage;
