import React from "react";
import { db } from "../config/firebase-config";
import {
  collection,
  getDocs,
  deleteDoc,
  setDoc,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import FridgeProps from "../interfaces/page";
import MyFridge from "../components/MyFridge/MyFridge";
import Ingredient from "../interfaces/page";

const Fridge: React.FC<FridgeProps> = (props) => {
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

  const updateFridge = async (id: string, name: string) => {
    const userFridgeItemQtyRef = collection(db, "users", user.uid, "fridge");
    const userFridgeItemQtyDocRef = doc(userFridgeItemQtyRef, id.toString());

    if (name === 'subtract') {
      // decrease the quantity of the item in the fridge
      await updateDoc(userFridgeItemQtyDocRef, {quantity: increment(-1)});
    } else if (name === 'add') {
      // increase the quantity of the item in the fridge
    await updateDoc(userFridgeItemQtyDocRef, {quantity: increment(1)});

    }

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
      <h1>My Fridge</h1>
      {firestoreData.length === 0 ? (
        <p>No items in your Fridge</p>
      ) : (
        <MyFridge
          firestoreData={firestoreData}
          addFridge={addFridge}
          removeFridge={removeFridge}
          updateFridge={updateFridge}
          user={user}
        />
      ) }
    </>
  );
};

export default Fridge;
