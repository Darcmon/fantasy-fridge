import React from 'react';
import { db } from "../config/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import FridgeProps from '../interfaces/page';
import KitchenIcon from "@mui/icons-material/Kitchen";
import {
    TextInput,
    TextInputProps,
    ActionIcon,
    Button,
    Group,
    useMantineTheme,
  } from "@mantine/core";


 
const Fridge: React.FC<FridgeProps> = (props) => {
  const API_KEY = import.meta.env.VITE_SPOON_API_KEY;
    
    const { user } = props;

      // Firestore API single get
  const userFridgeRef = collection(db, "users", user.uid, "fridge");
  const [firestoreData, setFirestoreData] = React.useState([]);
  
  React.useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(userFridgeRef);
      console.log(querySnapshot);
      let dbData = [];
      querySnapshot.docs.forEach((doc) => {
        console.log(dbData);
        dbData.push(doc.data());
        setFirestoreData(dbData);
      });
    }
    fetchData();
  }, []);


  console.log(firestoreData);
    return ( 
        <>
            <h1>My Fridge</h1>
            {firestoreData.map((item) => {
            return (
                <>
                <p>{item.name}</p>
                <img src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}/>
                <Group>
                    <Button leftIcon={<KitchenIcon/>}></Button>
                    <Button>-</Button>
                    <Button>+</Button>
                </Group>
                </>
            )
        })
        }
        </>
     );
}
 
export default Fridge;