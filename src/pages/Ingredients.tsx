import React from 'react';
import { db } from "../config/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import IngredientsProps from '../interfaces/page';


 
const Ingredients: React.FC<IngredientsProps> = (props) => {
  const API_KEY = import.meta.env.VITE_SPOON_API_KEY;
    
    const { user } = props;

      // Firestore API single get
  const userIngredientsRef = collection(db, "users", user.uid, "Ingredients");
  const [firestoreData, setFirestoreData] = React.useState("");
  
  React.useEffect(() => {
  async function fetchData() {
    const querySnapshot = await getDocs(userIngredientsRef);
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
            <h1>Ingredients</h1>
        </>
     );
}
 
export default Ingredients;