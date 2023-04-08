import React from "react";
import { Link } from "react-router-dom";
import { db } from "../config/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import MyFridge from "../components/MyFridge/MyFridge";
import { User } from "firebase/auth";

// import BottomNavigation from "@mui/material/BottomNavigation";
// import BottomNavigationAction from "@mui/material/BottomNavigationAction";
// import FoodBankIcon from "@mui/icons-material/FoodBank";
// import KitchenIcon from "@mui/icons-material/Kitchen";
// import EggIcon from "@mui/icons-material/Egg";
// import MenuBookIcon from "@mui/icons-material/MenuBook";

interface IPageProps {
  name: string;
  user: User;
}

const HomePage: React.FC<IPageProps> = (props) => {
  const API_KEY = import.meta.env.VITE_SPOON_API_KEY;
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const { user } = props;
  
  // React.useEffect(() => {
  //   (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
  // }, [value]);

  // Spoonacular API
  const [instructions, setInstructions] = React.useState("");
  React.useEffect(() => {
    async function fetchData() {
      const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=1&addRecipeInformation=true&instructionsRequired=true&query=chicken`)
      
      const json = await data.json()
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
    
    querySnapshot.docs.forEach((doc) => {
      
      setFirestoreData(JSON.stringify(doc.data()));
    });
  }
  fetchData()
}, []);
  
  return (
    <>
    <div>
      <p>Welcome to this page that is protected by Firebase</p>

      <p>Click <Link to="/logout">here</Link> to logout.</p>

      <h1>Hello</h1><p>{user.uid}</p>

      <h2>Fridge:</h2> {firestoreData ? null : <p>No items in your Fridge</p>}
      <MyFridge user={user}/>
    </div>
    
    </>
  );
};

export default HomePage;
