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

interface MyFridgeProps {
  user: User;
}

const MyFridge: React.FC<MyFridgeProps> = (props) => {
  const API_KEY = import.meta.env.VITE_SPOON_API_KEY;
  const { user } = props;

  const userFridgeRef = collection(db, "users", user.uid, "fridge");

  const [firestoreData, setFirestoreData] = React.useState<Ingredient[]>([]);
  const [fridgeEdit, setFridgeEdit] = React.useState(false);

  const addFridge = async (item: Ingredient) => {
    const userFridgeItemRef = collection(db, "users", user.uid, "fridge");
    const userFridgeItemDocRef = doc(userFridgeItemRef, item.id.toString());

    await setDoc(userFridgeItemDocRef, item);
    fridgeEdit ? setFridgeEdit(false) : setFridgeEdit(true);
  };

  const removeFridge = async (id: string) => {
    const userFridgeItemRef = doc(db, "users", user.uid, "fridge", id);

    await deleteDoc(userFridgeItemRef);
    fridgeEdit ? setFridgeEdit(false) : setFridgeEdit(true);
  };

  React.useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(userFridgeRef);
      let dbData: Ingredient[] = [];
      querySnapshot.docs.forEach((doc) => {
        dbData.push(doc.data() as Ingredient);
      });
      setFirestoreData(dbData);
      // setFirestoreData(querySnapshot.docs.map((doc) => doc.data() as Ingredient));
    }
    fetchData();
  }, [fridgeEdit]);
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
                <Button
                  color="red"
                  onClick={() => removeFridge(item.id.toString())}
                  leftIcon={<KitchenIcon />}
                >
                  Rm
                </Button>
              ) : (
                <Button
                  onClick={() => addFridge(item)}
                  leftIcon={<KitchenIcon />}
                >
                  Add
                </Button>
              )}
              <Button>-</Button>
              <Button>+</Button>
            </Group>
          </div>
        );
      })}
    </>
  );
};

export default MyFridge;
