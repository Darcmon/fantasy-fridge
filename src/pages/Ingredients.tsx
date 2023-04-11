import React from "react";
import { db } from "../config/firebase-config";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
  addDoc,
  increment,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import KitchenIcon from "@mui/icons-material/Kitchen";
import { User } from "firebase/auth";
import Ingredient from "../interfaces/page";

import { Button, Group, useMantineTheme } from "@mantine/core";
import IngredientSearch from "../components/IngredientSearch/IngredientSearch";
import MyFridge from "../components/MyFridge/MyFridge";
import IngredientDetails from "../components/IngredientDetails/IngredientDetails";

interface IngredientsProps {
  user: User;
}

const Ingredients: React.FC<IngredientsProps> = (props) => {
  const API_KEY = import.meta.env.VITE_SPOON_API_KEY;

  const [firestoreData, setFirestoreData] = React.useState<Ingredient[]>([]);
  const [fridgeEdit, setFridgeEdit] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchData, setSearchData] = React.useState([]);

  const { user } = props;
  const { id } = useParams();
  const theme = useMantineTheme();

  const userFridgeRef = collection(db, "users", user.uid, "fridge");

  // const updateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchValue(e.target.value);
  // };

  const getSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setSearchQuery(searchValue);
  };

  const getIngredients = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/food/ingredients/search?query=${searchQuery}&number=15&sortDirection=desc&apiKey=${API_KEY}`
    );
    const json = await data.json();
    setSearchData(json.results);
  };

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

  React.useEffect(() => {
    getIngredients();
  }, [searchQuery]);

  return (
    <>
    {!id ? (<>
      <h1>Ingredients</h1>
      <h2>Search Results</h2>
      <IngredientSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        getSearch={getSearch}
        searchData={searchData}
        updateFridge={updateFridge}
        firestoreData={firestoreData}
        addFridge={addFridge}
        removeFridge={removeFridge}
        user={user}
        // key={user.uid}
      />

      <h2>My Fantasy Fridge</h2>

      {firestoreData.length === 0 ? (
        <p>No items in your Fridge</p>
      ) : (
        <MyFridge
          user={user}
          // key={user.uid}
        />
      )}
    </>) : <IngredientDetails name="Strawberry Waffle"/>}
    </>
  );
};

export default Ingredients;
