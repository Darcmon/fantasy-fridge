import React from "react";
import Ingredient from "../../interfaces/page";
import {
  TextInput,
  Anchor,
  Button,
  Paper,
  useMantineTheme,
} from "@mantine/core";
import { User } from "firebase/auth";
import { IconSearch } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface RecipeSearchProps {
    user: User;
    firestoreData: Ingredient[];
    searchData: Ingredient[];
    recipeValue: string;
    setRecipeValue: (value: string) => void;
    getSearch: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    setIngredientValue: (value: string) => void;
    ingredientValue: string;

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
        ingredientValue
      } = props;
  const theme = useMantineTheme();
    const navigate = useNavigate();


  const [cartDraftString, setDraftString] = React.useState<string>("");


    // const getSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //     e.preventDefault();
      
    //     setSearchQuery(searchValue);
      
    //     if (searchValue.includes(", ")) {
    //       const [recipeValue, ...ingredientValues] = searchQuery.split(", ");
    //       console.log(recipeValue);
      
    //       setRecipeQuery(recipeValue);
      
    //       const cartIngredients = ingredientValues.join(",+");
    //       console.log(cartIngredients);
      
    //       setCartQuery(cartIngredients);
      
    //       getRecipes();
    //     } else {
    //       // If there are no ingredients, set the cart query to an empty string
    //       setCartQuery('');
      
    //       setRecipeQuery(searchValue);
      
    //       getRecipes();
    //     }
    //   };
      


  const cartDraft = async (firestoreData: Ingredient[]) => {
    let draftString: string = "";
    firestoreData.forEach((ingredient) => {
      draftString += ingredient.name + " ";
    });
    setDraftString(draftString.trim());
  };
  
  React.useEffect(() => {
    cartDraft(firestoreData);
  }, [firestoreData]);

// if (searchData[0].id === 782585) {
//     return (
//         <h2>Please enter a valid search query.</h2>
//     )
// }
// else if (!searchData[0].id) {
  return (
    <>
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
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
      <h2>Recipe Search Results</h2>
      {searchData.map((item: Ingredient) => {
        // const filteredData = firestoreData.filter(
        //   (firestoreItem) => firestoreItem.id === item.id
        // );

        return (
            <Anchor
            underline={false}
            color = 'black'
            onClick={() => navigate(`/recipes/${item.id}`)}
            >
            <div key={item.id} onClick={() => navigate(`/recipes/${item.id}`)}>
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
            </Anchor>
        );
      })}
    </>
  );
};

export default RecipeSearch;
