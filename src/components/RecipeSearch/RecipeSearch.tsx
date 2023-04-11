import React from "react";
import Ingredient from "../../interfaces/page";
import {
  TextInput,
  ActionIcon,
  Button,
  Group,
  useMantineTheme,
} from "@mantine/core";
import { User } from "firebase/auth";
import { IconArrowLeft, IconArrowRight, IconSearch } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface RecipeSearchProps {
    user: User;
    firestoreData: Ingredient[];
    addFridge: (item: Ingredient, quantity: number) => void;
    removeFridge: (id: string) => void;
    updateFridge: (id: string, name: string) => void;
}

const RecipeSearch: React.FC<RecipeSearchProps> = (props) => {
  const API_KEY = import.meta.env.VITE_SPOON_API_KEY;

    const {
        firestoreData,
        user
      } = props;
  const theme = useMantineTheme();
    const navigate = useNavigate();

  const [searchValue, setSearchValue] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchData, setSearchData] = React.useState([]);
  const [cartQuery, setCartQuery] = React.useState(null as string | null);
    const [recipeQuery, setRecipeQuery] = React.useState(null as string | null);
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
      
    const getSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
      
        setSearchQuery(searchValue);
      
        if (searchValue.includes(", ")) {
          const [recipeValue, ...ingredientValues] = searchQuery.split(", ");
          console.log(recipeValue);
      
          setRecipeQuery(recipeValue);
      
          const cartIngredients = ingredientValues.join(",+");
          console.log(cartIngredients);
      
          setCartQuery(cartIngredients);
      
          getRecipes();
        } else if (searchValue.includes(" ")) {
          const [recipeValue, ...ingredientValues] = searchValue.split(" ");
          console.log(recipeValue);
      
          setRecipeQuery(recipeValue);
      
          const cartIngredients = ingredientValues.join("+");
          console.log(cartIngredients);
      
          setCartQuery(cartIngredients);
      
          getRecipes();
        } else {
          // If there are no dish types or ingredients, set both the recipe and cart queries to an empty string
          setRecipeQuery('');
          setCartQuery('');
      
          getRecipes();
        }
      };
      
      
      
  const getRecipes = async () => {
    console.log(cartQuery);
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${recipeQuery}&instructionsRequired=true&addRecipeInformation=true&includeIngredients=${cartQuery}&sortDirection=desc&apiKey=${API_KEY}`
    );
    const json = await data.json();
    console.log(json.results);
    
    setSearchData(json.results);
  };

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


  React.useEffect(() => {
    getRecipes();
  }, [recipeQuery, cartQuery]);

  return (
    <>
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
        placeholder="Search Recipes.. (e.g pasta, chicken, tomato...)"
        rightSectionWidth={42}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value)
          }
        value={searchValue}
        {...props}
      />
      <h2>Recipe Search Results</h2>
      {searchData.map((item: Ingredient) => {
        const filteredData = firestoreData.filter(
          (firestoreItem) => firestoreItem.id === item.id
        );

        return (
          <>
            <div key={item.id} onClick={() => navigate(`/recipes/${item.id}`)}>
            <p>
              {item.title} {item.id} {item.sourceName} Ready in: {item.readyInMinutes} minutes Servings: {item.servings}
            </p>

            <img
              src={`${item.image}`}
              alt={`${item.name} picture`}
            />
            </div>
          </>
        );
      })}
    </>
  );
};

export default RecipeSearch;
