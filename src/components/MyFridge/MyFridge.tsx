import React from "react";
import { db } from "../../config/firebase-config";
import {
  collection,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
  increment,
  getDocs,
} from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import KitchenIcon from "@mui/icons-material/Kitchen";
import { User } from "firebase/auth";
import Ingredient from "../../interfaces/page";
import { Stack, Anchor, Grid, } from "@mantine/core";
import CartEdit from "../CartEdit/CartEdit";
import FridgeEdit from "../FridgeEdit/FridgeEdit";
import FeaturesCard from "../IngredientCard/IngredientCard";

interface MyFridgeProps {
  user: User;
}

const MyFridge: React.FC<MyFridgeProps> = (props) => {
  const API_KEY = import.meta.env.VITE_SPOON_API_KEY;
  const { user } = props;
  const navigate = useNavigate();

  const userFridgeRef = collection(db, "users", user.uid, "fridge");

  const [fridgeEdit, setFridgeEdit] = React.useState(false);
  const [firestoreData, setFirestoreData] = React.useState<Ingredient[]>([]);

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


  const addFridge = async (item: Ingredient, quantity: number) => {
    const userFridgeItemRef = collection(db, "users", user.uid, "fridge");
    const userFridgeItemDocRef = doc(userFridgeItemRef, item.id.toString());

    await setDoc(userFridgeItemDocRef, item);
    await setDoc(userFridgeItemDocRef, { quantity: 0 }, { merge: true });

    fridgeEdit ? setFridgeEdit(false) : setFridgeEdit(true);
  };

  const updateFridge = async (id: string, name: string) => {
    const userFridgeItemQtyRef = collection(db, "users", user.uid, "fridge");
    const userFridgeItemQtyDocRef = doc(userFridgeItemQtyRef, id.toString());

    if (name === "subtract") {
      // decrease the quantity of the item in the fridge
      await updateDoc(userFridgeItemQtyDocRef, { quantity: increment(-1) });
    } else if (name === "add") {
      // increase the quantity of the item in the fridge
      await updateDoc(userFridgeItemQtyDocRef, { quantity: increment(1) });
    }

    fridgeEdit ? setFridgeEdit(false) : setFridgeEdit(true);
  };

  const removeFridge = async (id: string) => {
    const userFridgeItemRef = doc(db, "users", user.uid, "fridge", id);

    await deleteDoc(userFridgeItemRef);
    fridgeEdit ? setFridgeEdit(false) : setFridgeEdit(true);
  };

  return (
    <>
      {firestoreData.length === 0 ? (
        <p>No items in your Fridge</p>
      ) : (
        <>
        <Grid>
          {firestoreData.map((item: Ingredient) => {
            const filteredData = firestoreData.filter(
              (firestoreItem) => firestoreItem.id === item.id
            );
            return (
              <Grid.Col span={4} key={item.id}>
                <FeaturesCard user={user} item={item}/>
                {/* <Anchor
            underline={false}
            color = 'black'
            onClick={() => navigate(`/ingredients/${item.id}`)}
            >
                <p>
                  {item.name}
                </p>
                <img
                  src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}
                  alt={`${item.name} picture`}
                />
                </Anchor>
                          <Stack align='center' justify='center'
          spacing='xl'
          >
                  <FridgeEdit user={user} item={item}/>
                  <CartEdit user={user} item={item} />
                </Stack> */}
              </Grid.Col>
            );
          })}
          </Grid>
        </>
      )}
    </>
  );
};

export default MyFridge;
