import logo from "../../assets/fantasy-fridge-logo.png";
import Ingredient from "../../interfaces/page";
import CartEdit from "../../components/CartEdit/CartEdit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { Anchor, Badge, Image, Tabs } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import KitchenIcon from "@mui/icons-material/Kitchen";
import React from "react";
import { User } from "firebase/auth";

export interface HeaderNavProps {
  user: User;
}

const HeaderNav: React.FC<HeaderNavProps> = (props) => {
  const [cartCounter, setCartCounter] = useState<number>(0);
  const { user } = props

  const userCartRef = collection(db, "users", user.uid, "cart");

  React.useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(userCartRef);
      let dbData: Ingredient[] = [];
      querySnapshot.docs.forEach((doc) => {
        dbData.push(doc.data() as Ingredient);
      });
      setCartCounter(dbData.length);
      // setFirestoreData(querySnapshot.docs.map((doc) => doc.data() as Ingredient));
    }
    fetchData();
  }, [CartEdit]);

  const navigate = useNavigate();

  return (
    <>
    <Anchor>
      <Image
        maw={120}
        mx="auto"
        src={logo}
        alt="logo"
        p='xs'
        onClick={() => navigate("/")}
      />
      </Anchor>
      <Tabs defaultValue="home" variant="pills" radius="lg">
        <Tabs.List grow>
          <Tabs.Tab value="Home" onClick={() => navigate("/")}>
            Home
          </Tabs.Tab>
          <Tabs.Tab
            value="fridge"
            onClick={() => navigate("/fridge")}
            icon={<KitchenIcon />}
          >
            Fridge
          </Tabs.Tab>
          <Tabs.Tab
            value="ingredients"
            onClick={() => navigate("/ingredients")}
          >
            Ingredients
          </Tabs.Tab>
          <Tabs.Tab
            rightSection={
              <Badge
                w={32}
                h={32}
                sx={{ pointerEvents: "none" }}
                variant="filled"
                size="xl"
                p={0}
                color="orange"
              >
                {cartCounter}
              </Badge>
            }
            value="cookbook"
            onClick={() => navigate("/recipes")}
          >
            Cookbook Search
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </>
  );
};

export default HeaderNav;
