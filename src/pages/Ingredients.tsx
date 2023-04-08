import React from "react";
import { db } from "../config/firebase-config";
import { collection, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import KitchenIcon from "@mui/icons-material/Kitchen";
import { User } from "firebase/auth";
import Ingredient from "../interfaces/page";

import {
  TextInput,
  TextInputProps,
  ActionIcon,
  Button,
  Group,
  useMantineTheme,
} from "@mantine/core";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
// import MyFridge from "../components/MyFridge/MyFridge";

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

  const updateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const getSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setSearchQuery(searchValue);
  };

  const getIngredients = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/food/ingredients/search?query=${searchQuery}&number=15&sortDirection=desc&apiKey=${API_KEY}`
    );
    const json = await data.json();
    console.log(json);
    setSearchData(json.results);
  };

  const addFridge = async (item: Ingredient) => {
    const userFridgeItemRef = collection(db, "users", user.uid, "fridge");
    const userFridgeItemDocRef = doc(userFridgeItemRef, item.id.toString());
    console.log(item.name, item.image, item.id);
  
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
      console.log(querySnapshot);
      let dbData: Ingredient[] = [];
      querySnapshot.docs.forEach((doc) => {
        dbData.push(doc.data() as Ingredient);
      });
      console.log(dbData);
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
      <h1>Ingredients</h1>
      <TextInput
        icon={<IconSearch size="1.1rem" stroke={1.5} />}
        radius="xl"
        size="md"
        rightSection={
          <ActionIcon
            size={32}
            radius="xl"
            color={theme.primaryColor}
            variant="filled"
            onClick={getSearch}
          >
            {theme.dir === "ltr" ? (
              <IconArrowRight size="1.1rem" stroke={1.5} />
            ) : (
              <IconArrowLeft size="1.1rem" stroke={1.5} />
            )}
          </ActionIcon>
        }
        placeholder="Search ingredients"
        rightSectionWidth={42}
        onChange={updateSearch}
        value={searchValue}
        {...props}
      />
      {/* <MyFridge user={user}/> */}
      <h2>My Fridge</h2>
      {firestoreData.map((item: Ingredient) => {
        const filteredData = firestoreData.filter(firestoreItem => firestoreItem.id === item.id);
        return (
          <div key={item.id}>
            <p>{item.name} {item.id}</p>
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
              >Rm</Button>
              ) : (
                <Button
                  onClick={() => addFridge(item)}
                  leftIcon={<KitchenIcon />}
                >Add</Button>
              )}
              <Button>-</Button>
              <Button>+</Button>
            </Group>
          </div>
        );
      })}

      <h2>Search Results</h2>
      {searchData.map((item: Ingredient) => {
        const filteredData = firestoreData.filter(firestoreItem => firestoreItem.id === item.id);

        return (
          <>
            <p>{item.name} {item.id}</p>

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
              >Rm</Button>
              ) : (
                <Button
                  onClick={() => addFridge(item)}
                  leftIcon={<KitchenIcon />}
                >Add</Button>
              )}
              <Button>-</Button>
              <Button>+</Button>
            </Group>
          </>
        );
      })}
    </>
  );
};

export default Ingredients;
