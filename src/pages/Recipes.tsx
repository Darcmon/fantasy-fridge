import React, { useEffect } from "react";
import { db } from "../config/firebase-config";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import KitchenIcon from "@mui/icons-material/Kitchen";
import { User } from "firebase/auth";
import Ingredient from "../interfaces/page";
import MyFridge from "../components/MyFridge/MyFridge";
import Confetti from 'react-confetti'

import {
  useMantineTheme,
} from "@mantine/core";
import RecipeSearch from "../components/RecipeSearch/RecipeSearch";
import MyCart from "../components/MyCart/MyCart";
import RecipeDetails from "../components/RecipeDetails/RecipeDetails";
// import MyFridge from "../components/MyFridge/MyFridge";

interface RecipesProps {
  user: User;
}

const Recipes: React.FC<RecipesProps> = (props) => {
  const API_KEY = import.meta.env.VITE_SPOON_API_KEY;

  const [firestoreData, setFirestoreData] = React.useState<Ingredient[]>([]);
  const [fridgeEdit, setFridgeEdit] = React.useState(false);
  const [recipeValue, setRecipeValue] = React.useState("");
  const [ingredientValue, setIngredientValue] = React.useState("");
  const [ingredientQuery, setIngredientQuery] = React.useState(null as string | null);
  // const [searchQuery, setSearchQuery] = React.useState("");
  const [searchData, setSearchData] = React.useState([]);
  const [searchDraftData, setSearchDraftData] = React.useState([]);
  const [recipeQuery, setRecipeQuery] = React.useState(null as string | null);
  const [slowTransitionOpened, setSlowTransitionOpened] = React.useState<boolean>(false);



  const { user } = props;
  const { id } = useParams();
  const theme = useMantineTheme();

  const userFridgeRef = collection(db, "users", user.uid, "fridge");
  const userCartRef = collection(db, "users", user.uid, "cart");

  const addFridge = async (item: Ingredient) => {
    const userFridgeItemRef = collection(db, "users", user.uid, "fridge");
    const userFridgeItemDocRef = doc(userFridgeItemRef, item.id.toString());
    console.log(item.name, item.image, item.id);

    await setDoc(userFridgeItemDocRef, item);
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

  const getSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(recipeValue, ingredientValue);
    console.log(recipeQuery, ingredientQuery);
    
    
    if (recipeValue && ingredientValue) {
      const ingredients = ingredientValue.replaceAll(/,|\s/g, '+');
      const recipe = recipeValue.replaceAll(/,|\s/g, '+');
      setRecipeQuery(recipe);

      setIngredientQuery(ingredients);
      getRecipes();
    } else if (recipeValue) {
      const recipe = recipeValue.replaceAll(/,|\s/g, '+');
      setRecipeQuery(recipe);
      setIngredientQuery('');
      getRecipes();
    } else if (ingredientValue) {
      const ingredients = ingredientValue.replaceAll(/,|\s/g, '+');
      setRecipeQuery('');
      setIngredientQuery(ingredients);
      getRecipes();
    }
  };
  
  
  
const getRecipes = async () => {
const data = await fetch(
  `https://api.spoonacular.com/recipes/complexSearch?query=${recipeQuery}&instructionsRequired=true&addRecipeInformation=true&includeIngredients=${ingredientQuery}&sortDirection=desc&apiKey=${API_KEY}`
);
const json = await data.json();
console.log(json.results);
setSearchData(json.results);
};

const getDraftRecipe = async () => {
  const data = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=&instructionsRequired=true&addRecipeInformation=true&includeIngredients=${ingredientQuery}&sortDirection=desc&apiKey=${API_KEY}`
  );
  const json = await data.json();
  console.log(json.results);
  setSearchData(json.results);
  };

React.useEffect(() => {
  getDraftRecipe();
}, [slowTransitionOpened]);

React.useEffect(() => {
  getRecipes();
}, [recipeQuery, ingredientQuery]);

  return (
    <>
    {!id ? (<>
      <h1>Recipes</h1>
      {/* <Confetti/> */}
      
      <RecipeSearch
        firestoreData={firestoreData}
        searchData={searchData}
        recipeValue={recipeValue}
        setRecipeValue={setRecipeValue}
        setIngredientValue={setIngredientValue}
        ingredientValue={ingredientValue}
        getSearch={getSearch}
        slowTransitionOpened={slowTransitionOpened}
        setSlowTransitionOpened={setSlowTransitionOpened}
        setIngredientQuery={setIngredientQuery}
        searchDraftData={searchDraftData}
        user={user}
      />

      <h2>My Fantasy Fridge</h2>
      <MyFridge
        user={user}
      />

      <h2>My Cooking Draft</h2>
      <MyCart user={user} firestoreFridgeData={firestoreData} />
    </>) : <RecipeDetails user={user} id={id}/>}
    </>
  );
};

export default Recipes;
