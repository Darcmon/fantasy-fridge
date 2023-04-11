//   // Spoonacular API
//   const [instructions, setInstructions] = React.useState("");
//   React.useEffect(() => {
//     async function fetchData() {
//       const data = await fetch(
//         `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=1&addRecipeInformation=true&instructionsRequired=true&query=chicken`
//       );

//       const json = await data.json();
//       setInstructions(
//         JSON.stringify(json.results[0].analyzedInstructions[0].steps)
//       );
//     }
//     fetchData();
//   });

//   // Firestore API single get
//   const userFridgeRef = collection(db, "users", user.uid, "fridge");
//   const [firestoreData, setFirestoreData] = React.useState("");

//   React.useEffect(() => {
//   async function fetchData() {
//     const querySnapshot = await getDocs(userFridgeRef);

//     querySnapshot.docs.forEach((doc) => {

//       setFirestoreData(JSON.stringify(doc.data()));
//     });
//   }
//   fetchData()
// }, []);

import React from "react";
import "./RecipeDetails.scss";
import { User } from "firebase/auth";
import EggIcon from "@mui/icons-material/Egg";

import {
  Container,
  Grid,
  SimpleGrid,
  Skeleton,
  useMantineTheme,
  rem,
  Image,
  List,
  ThemeIcon,
  Text,
    BackgroundImage,
    Stack
} from "@mantine/core";
import FridgeEdit from "../FridgeEdit/FridgeEdit";
import CartEdit from "../CartEdit/CartEdit";
import Recipe from "../../interfaces/page";

const PRIMARY_COL_HEIGHT = rem(300);

interface RecipeDetailsProps {
  user: User;
  id: string;
}

interface RecipeDetails {
    RecipeData: Recipe;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = (props) => {
  const { user, id } = props;
  const theme = useMantineTheme();

  const API_KEY = import.meta.env.VITE_SPOON_API_KEY;

  const [recipeData, setRecipeData] = React.useState<RecipeDetails>([]);

  // const getRecipes = async () => {
  //     const data = await fetch(
  //       `  https://api.spoonacular.com/food/Recipes/${id}/information&apiKey=${API_KEY}`
  //     );
  //     const json = await data.json();
  //     setRecipeData(json.results);
  //   };

  React.useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );
      const json = await data.json();
      setRecipeData(json);
    }
    fetchData();
  }, [id, API_KEY]);

  console.log(recipeData);

  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;

  if (recipeData.length === 0) {
    return (
      <h1>
        LOADINGGG
      </h1>
    )
  }
//   const { name, image, id } = RecipeData;
  return (
    <Container my="md">
      <SimpleGrid
        cols={2}
        spacing="md"
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        <div className="recipe-detail__border">
        <Image
          height={PRIMARY_COL_HEIGHT}
          radius="md"
          src={recipeData.image}
          caption={recipeData.creditsText}
        />
        <Text>{recipeData.instructions}</Text>
        </div>
        <Grid gutter="md">
          <Grid.Col>
            <h1>{recipeData.title}</h1>
          </Grid.Col>
          <Grid.Col span={6}>
          <List
              spacing="xs"
              size="sm"
              icon={
                <ThemeIcon color="teal" size={24} radius="xl">
                  <EggIcon />
                </ThemeIcon>
              }
            >
              <List.Item>Ready in: {recipeData.readyInMinutes} mins.</List.Item>
              <List.Item>Servings: {recipeData.servings}</List.Item>
              <List.Item>Dairy-Free: {recipeData.dairyFree.toString()}</List.Item>
              <List.Item>Gluten-Free: {recipeData.glutenFree.toString()}</List.Item>
              <List.Item>Vegan: {recipeData.vegan.toString()}</List.Item>
              <List.Item>Vegetarian: {recipeData.vegetarian.toString()}</List.Item>

            </List>
          </Grid.Col>
          <Grid.Col span={6}>
            <List
              spacing="xs"
              size="sm"
              icon={
                <ThemeIcon color="teal" size={24} radius="xl">
                  <EggIcon />
                </ThemeIcon>
              }
            >
                <h2>Ingredients</h2>
                {recipeData.extendedIngredients.map((ingredient) => (
              <List.Item key={ingredient}>{ingredient.name}</List.Item>
            ))}

            </List>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
};

export default RecipeDetails;
