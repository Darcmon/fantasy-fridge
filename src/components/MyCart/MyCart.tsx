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
import CartEdit from "../CartEdit/CartEdit";

interface MyCartProps {
  user: User;
  firestoreFridgeData: Ingredient[];
}

const MyCart: React.FC<MyCartProps> = (props) => {
  const API_KEY = import.meta.env.VITE_SPOON_API_KEY;
  const { user, firestoreFridgeData } = props;

  const userCartRef = collection(db, "users", user.uid, "cart");

  const [firestoreData, setFirestoreData] = React.useState<Ingredient[]>([]);
  const [cartEdit, setCartEdit] = React.useState(false);

  const addCart = async (item: Ingredient) => {
    const userCartItemDocRef = doc(userCartRef, item.id.toString());

    await setDoc(userCartItemDocRef, item);
    cartEdit ? setCartEdit(false) : setCartEdit(true);
  };

  const removeCart = async (id: string) => {
    const userCartItemRef = doc(db, "users", user.uid, "cart", id);

    await deleteDoc(userCartItemRef);
    cartEdit ? setCartEdit(false) : setCartEdit(true);
  };

  React.useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(userCartRef);
      let dbData: Ingredient[] = [];
      querySnapshot.docs.forEach((doc) => {
        dbData.push(doc.data() as Ingredient);
      });
      setFirestoreData(dbData);
      // setFirestoreData(querySnapshot.docs.map((doc) => doc.data() as Ingredient));
    }
    fetchData();
  }, [cartEdit]);
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
                  onClick={() => removeCart(item.id.toString())}
                  leftIcon={<KitchenIcon />}
                >
                  Rm
                </Button>
              ) : (
                <Button
                  onClick={() => addCart(item)}
                  leftIcon={<KitchenIcon />}
                >
                  Add
                </Button>
              )}
              {/* <Button onClick={() => removeCart(item.id.toString())}>-</Button>
              <p>{filteredData[0].quantity}</p>
              <Button onClick={() => addCart(item)}>+</Button> */}
              <CartEdit user={user} item={item} />
            </Group>
          </div>
        );
      })}
    </>
  );
};

export default MyCart;
