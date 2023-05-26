import React from "react";
import Ingredient from "../../interfaces/page";
import {
  TextInput,
  Anchor,
  Button,
  Paper,
  useMantineTheme,
  Modal,
  Grid
} from "@mantine/core";
import { User } from "firebase/auth";
import { IconSearch } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import Confetti from "react-confetti";
import RecipeCard from "../RecipeCard/RecipeCard";
import FeatureCard from "../IngredientCard/IngredientCard";

interface RecipeSearchProps {
    user: User;
    firestoreData: Ingredient[];
    searchData: Ingredient[];
    recipeValue: string;
    setRecipeValue: (value: string) => void;
    getSearch: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    setIngredientValue: (value: string) => void;
    ingredientValue: string;
    slowTransitionOpened: boolean;
    setSlowTransitionOpened: (value: boolean) => void;
    setIngredientQuery: (value: string) => void;
    searchDraftData: any;
}

const RecipeSearch: React.FC<RecipeSearchProps> = (props) => {
  const API_KEY = import.meta.env.VITE_SPOON_API_KEY;

    const {
        firestoreData,
        user,
        searchData,
        recipeValue,
        setRecipeValue,
        getSearch,
        setIngredientValue,
        ingredientValue,
        slowTransitionOpened,
        setSlowTransitionOpened,
        setIngredientQuery,
        searchDraftData
      } = props;
  const theme = useMantineTheme();
    const navigate = useNavigate();

    const userCartRef = collection(db, "users", user.uid, "cart");
  const [cartDraftString, setDraftString] = React.useState<string>("");


  return (
    <>
          <Modal
        opened={slowTransitionOpened}
        onClose={() => setSlowTransitionOpened(false)}
        title="YOUR FANTASY DRAFT"
        transitionProps={{ transition: 'rotate-left' }}
      >
        <Confetti/>
        <Grid>
      {searchData.map((item: Ingredient) => {
        return (
            <Grid.Col span={4} key={item.id}>
            <RecipeCard user={user} item={item}/>
            </Grid.Col>
        );
      })}
      </Grid>
        
      </Modal>
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
    <Button radius="xl" size="xl" uppercase variant="gradient"
            gradient={{ from: "teal", to: "orange" }}
            fullWidth onClick={() => setSlowTransitionOpened(true)}>
      FANTASY DRAFT
    </Button>
      <TextInput
        icon={<IconSearch size="1.1rem" stroke={1.5} />}
        radius="xl"
        size="md"
        label="Recipe Name"
        placeholder="Search Recipes.. (e.g eggplant parmesan)"
        rightSectionWidth={42}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setRecipeValue(e.target.value)
          }
        value={recipeValue}
        {...props}
      />
      <TextInput
        icon={<IconSearch size="1.1rem" stroke={1.5} />}
        radius="xl"
        size="md"
        label="Ingredients"
        placeholder="Included ingredients.. (e.g chicken, tomato...)"
        rightSectionWidth={42}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setIngredientValue(e.target.value)
          }
        value={ingredientValue}
        {...props}
      />
                <Button
            color="success"
            onClick={getSearch}
            variant="gradient"
            gradient={{ from: "teal", to: "orange" }}
            fullWidth
            mt="xl"
          >
            Search
          </Button>
      </Paper>
      {searchData.length > 0 ? <h2>Search Results</h2> : null}
      <Grid>
      {searchData.map((item: Ingredient) => {
        // const filteredData = firestoreData.filter(
        //   (firestoreItem) => firestoreItem.id === item.id
        // );

        return (
            <Grid.Col span={4} key={item.id}>
            <RecipeCard user={user} item={item}/>
            {/* <Anchor
            underline={false}
            color = 'black'
            key={item.id}
            onClick={() => navigate(`/recipes/${item.id}`)}
            >
            <div onClick={() => navigate(`/recipes/${item.id}`)}>
            <p>
              {item.title}
            </p>
            <p>Source: {item.sourceName} </p>
            <p>Ready in: {item.readyInMinutes} minutes</p>
            <p>Servings: {item.servings}</p>

            <img
              src={`${item.image}`}
              alt={`${item.name} picture`}
            />
            </div>
            </Anchor> */}
            </Grid.Col>
        );
      })}
      </Grid>
    </>
  );
};

export default RecipeSearch;
