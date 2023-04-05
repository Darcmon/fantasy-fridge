import React from 'react';
import { db } from "../config/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import FridgeProps from '../interfaces/page';


 
const Fridge: React.FC<FridgeProps> = (props) => {
  const API_KEY = import.meta.env.VITE_SPOON_API_KEY;
    
    const { user } = props;

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
        <>
            <h1>My Fridge</h1>
        </>
     );
}
 
export default Fridge;