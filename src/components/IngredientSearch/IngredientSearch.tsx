import React from "react";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import { Group, TextInput, TextInputProps, ActionIcon, Button, useMantineTheme } from "@mantine/core";
import Ingredient from "../../interfaces/page";
import KitchenIcon from "@mui/icons-material/Kitchen";


interface IngredientSearchProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  getSearch: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  searchData: Ingredient[];
  firestoreData: Ingredient[];
    addFridge: (item: Ingredient) => void;
    removeFridge: (id: string) => void;
}

const IngredientSearch: React.FC<IngredientSearchProps> = (props) => {
  const { searchValue, setSearchValue, getSearch, searchData, addFridge, removeFridge, firestoreData } = props;
  const theme = useMantineTheme();

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
        placeholder="Search ingredients"
        rightSectionWidth={42}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
        value={searchValue}
      />
      <h2>Search Results 1</h2>
      {searchData.map((item: Ingredient) => {
        const filteredData = firestoreData.filter(
          (firestoreItem) => firestoreItem.id === item.id
        );

        return (
          <>
            <p>
              {item.name} {item.id}
            </p>

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
                >
                  Rm
                </Button>
              ) : (
                <Button
                  onClick={() => addFridge(item)}
                  leftIcon={<KitchenIcon />}
                >
                  Add
                </Button>
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

export default IngredientSearch;