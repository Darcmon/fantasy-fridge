import React from "react";
import { db } from "../../config/firebase-config";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import KitchenIcon from "@mui/icons-material/Kitchen";
import { User } from "firebase/auth";
import Ingredient from "../../interfaces/page";
import { Button, Group } from "@mantine/core";
import CardEdit from "../CartEdit/CartEdit";

interface MyFridgeProps {
  user: User;
  firestoreData: Ingredient[];
  addFridge: (item: Ingredient, quantity: number) => void;
  removeFridge: (id: string) => void;
  updateFridge: (id: string, name: string) => void;
}

const MyFridge: React.FC<MyFridgeProps> = (props) => {
  const API_KEY = import.meta.env.VITE_SPOON_API_KEY;
  const { addFridge, removeFridge, firestoreData, updateFridge, user } = props;
  
  
  return (
    <>
      {firestoreData.map((item: Ingredient) => {
        const filteredData = firestoreData.filter(
          (firestoreItem) => firestoreItem.id === item.id
        );
        return (
          <div key={item.id}>
            <p>
              {item.name} {item.id}
            </p>
            <img
              src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}
              alt={`${item.name} picture`}
            />
            <Group>
              {filteredData.length > 0 ? (
                <>
                  <Button
                    color="red"
                    onClick={() => removeFridge(item.id.toString())}
                    leftIcon={<KitchenIcon />}
                  >
                    Rm
                  </Button>
                  <Button onClick={() => updateFridge(item.id.toString(), 'subtract')} name='subtract' >-</Button>
                  <p>{filteredData[0].quantity}</p>
                  <Button onClick={() => updateFridge(item.id.toString(), 'add')} name='add'>+</Button>
                </>
              ) : (
                <Button
                  onClick={() => addFridge(item, 0)}
                  leftIcon={<KitchenIcon />}
                >
                  Add
                </Button>
              )}
              <CardEdit 
              user={user}
              item={item}
              />
              {/* {filteredCartData.length > 0 ? (
                <>
                  <Button
                    color="red"
                    onClick={() => removeCart(item.id.toString())}
                    leftIcon={<KitchenIcon />}
                  >
                    Rm
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => addCart(item)}
                  leftIcon={<KitchenIcon />}
                >
                  Add
                </Button>
              )} */}
            </Group>
          </div>
        );
      })}
    </>
  );
};

export default MyFridge;
