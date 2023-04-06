import React from "react";
import { db } from "../config/firebase-config";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import IngredientsProps from "../interfaces/page";
import { useParams } from "react-router-dom";
import KitchenIcon from "@mui/icons-material/Kitchen";
import {
  TextInput,
  TextInputProps,
  ActionIcon,
  Button,
  Group,
  useMantineTheme,
} from "@mantine/core";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons-react";

const Ingredients: React.FC<IngredientsProps> = (props) => {
  const API_KEY = import.meta.env.VITE_SPOON_API_KEY;

  const [firestoreData, setFirestoreData] = React.useState([]);
  const [fridgeAdd, setFridgeAdd] = React.useState(false);
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

  const getSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchValue);
    console.log(searchValue);
  }

  const getIngredients = async () => {
    
        const data = await fetch(`https://api.spoonacular.com/food/ingredients/search?query=${searchQuery}&number=15&sortDirection=desc&apiKey=${API_KEY}`)
        const json = await data.json()
        console.log(json);
        setSearchData(json.results)
  };

  const addFridge = async (name, image, id) => {
    console.log(name);
    await setDoc(doc(userFridgeRef), { name, image, id });
    fridgeAdd ? setFridgeAdd(false) : setFridgeAdd(true);
};

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

  }, [fridgeAdd]);

//   React.useEffect(() => {
//     async function createData() {
//       const querySnapshot = await setDoc(doc(userFridgeRef), {

//       });
//       console.log(querySnapshot);
//       let dbData = [];
//     }
//     createData();
//   });

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

        <h2>My Fridge</h2>
        {firestoreData.map((item) => {
            return (
              <>
                <p>{item.name}</p>
                <img
                  src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}
                />
                <Group>
                  <Button
                    onClick={addFridge}
                    leftIcon={<KitchenIcon />}
                  ></Button>
                  <Button>-</Button>
                  <Button>+</Button>
                </Group>
              </>
            );
        })
        }

        <h2>Search Results</h2>
        {searchData.map((item) => {
            return (
              <>
                <p>{item.name}</p>
                <img
                  src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}
                />
                <Group>
                  <Button
                    onClick={() => addFridge(item.name, item.image, item.id)}
                    leftIcon={<KitchenIcon />}
                  ></Button>
                  <Button>-</Button>
                  <Button>+</Button>
                </Group>
              </>
            );
        })
        }

    </>
  );
};

export default Ingredients;
