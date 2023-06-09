import React from "react";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import {
  Stack,
  TextInput,
  TextInputProps,
  ActionIcon,
  Button,
  useMantineTheme,
  Anchor,
  Paper,
  Grid
} from "@mantine/core";
import Ingredient from "../../interfaces/page";
import KitchenIcon from "@mui/icons-material/Kitchen";
import CartEdit from "../CartEdit/CartEdit";
import FridgeEdit from "../FridgeEdit/FridgeEdit";
import { User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import FeaturesCard from "../IngredientCard/IngredientCard";


interface IngredientSearchProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  getSearch: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  searchData: Ingredient[];
  firestoreData: Ingredient[];
  addFridge: (item: Ingredient, quantity: number) => void;
  removeFridge: (id: string) => void;
  updateFridge: (id: string, name: string) => void;
  user: User;
}

const IngredientSearch: React.FC<IngredientSearchProps> = (props) => {
  const {
    searchValue,
    setSearchValue,
    getSearch,
    searchData,
    addFridge,
    removeFridge,
    firestoreData,
    updateFridge,
    user
  } = props;
  const theme = useMantineTheme();
  const navigate = useNavigate();


  return (
    <>
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchValue(e.target.value)
        }
        value={searchValue}
      />
      </Paper>
      
      {searchData.length > 0 ? <h2>Search Results</h2> : null}
      <Grid>
      {searchData.map((item: Ingredient) => {
        const filteredData = firestoreData.filter(
          (firestoreItem) => firestoreItem.id === item.id
        );

        return (
          <Grid.Col span={4} key={item.id}>
                <FeaturesCard user={user} item={item}/>
            {/* <div key={item.id}>
            <Anchor
            underline={false}
            color = 'black'
            onClick={() => navigate(`/ingredients/${item.id}`)}
            >
            <p>
              {item.name}
            </p>

            <img
              src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}
              alt={`${item.name} picture`}
            />
            </Anchor>
            <Stack align='center' justify='center'
                spacing='xl'>
              <FridgeEdit user={user} item={item}/>
              <CartEdit 
              user={user}
              item={item}
              />
            </Stack>
            </div> */}
            </Grid.Col>
        );
      })}
      </Grid>
    </>
  );
};

export default IngredientSearch;
