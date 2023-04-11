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
import "./IngredientDetails.scss";
import { User } from "firebase/auth";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

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
import Ingredient from "../../interfaces/page";

const PRIMARY_COL_HEIGHT = rem(300);

interface IngredientDetailsProps {
  user: User;
  id: string;
}

interface IngredientDetails {
    ingredientData: Ingredient;
}

const IngredientDetails: React.FC<IngredientDetailsProps> = (props) => {
  const { user, id } = props;
  const theme = useMantineTheme();

  const API_KEY = import.meta.env.VITE_SPOON_API_KEY;

  const [ingredientData, setIngredientData] = React.useState<IngredientDetails>([]);

  // const getIngredients = async () => {
  //     const data = await fetch(
  //       `  https://api.spoonacular.com/food/ingredients/${id}/information&apiKey=${API_KEY}`
  //     );
  //     const json = await data.json();
  //     setIngredientData(json.results);
  //   };

  React.useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        `https://api.spoonacular.com/food/ingredients/${id}/information?apiKey=${API_KEY}`
      );
      const json = await data.json();
      setIngredientData(json);
    }
    fetchData();
  }, [id, API_KEY]);

  console.log(ingredientData);

  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;

  if (ingredientData.length === 0) {
    return (
      <h1>
        LOADINGGG
      </h1>
    )
  }
//   const { name, image, id } = ingredientData;
  return (
    <Container my="md">
      <SimpleGrid
        cols={2}
        spacing="md"
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        <div className="ingredient-detail__border">
        <Image
          height={PRIMARY_COL_HEIGHT}
          radius="md"
          src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredientData.image}`}
        />
        </div>
        <Grid gutter="md">
          <Grid.Col>
            <h1>{ingredientData.name}</h1>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack>
            <FridgeEdit item={ingredientData} user={user}/>
            <CartEdit item={ingredientData} user={user}/>
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <List
              spacing="xs"
              size="sm"
              center
              icon={
                <ThemeIcon color="teal" size={24} radius="xl">
                  <ControlPointIcon />
                </ThemeIcon>
              }
            >
                <Text>Possible Units</Text>
                {ingredientData.possibleUnits.map((unit) => (
              <List.Item key={unit}>{unit}</List.Item>
            ))}

            </List>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
};

export default IngredientDetails;
