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
    searchData: Ingredient[];
    searchValue: string;
    setSearchValue: (value: string) => void;
    getSearch: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const RecipeSearch: React.FC<RecipeSearchProps> = (props) => {
  const API_KEY = import.meta.env.VITE_SPOON_API_KEY;

    const {
        firestoreData,
        user,
        searchData,
        searchValue,
        setSearchValue,
        getSearch,
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
              {item.title}
            </p>
            <p>Source: {item.sourceName} </p>
            <p> Ready in: {item.readyInMinutes} minutes</p>
            <p>Servings: {item.servings}</p>

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
