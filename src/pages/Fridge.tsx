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
import MyFridge from '../components/MyFridge/MyFridge';


 
const Fridge: React.FC<FridgeProps> = (props) => {
  const API_KEY = import.meta.env.VITE_SPOON_API_KEY;
    
    const { user } = props;
    
    return ( 
        <>
            <h1>My Fridge</h1>
            <MyFridge user={user}/>
        </>
     );
}
 
export default Fridge;