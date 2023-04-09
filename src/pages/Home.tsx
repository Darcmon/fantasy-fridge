import React from "react";
import { Link } from "react-router-dom";
import { db } from "../config/firebase-config";
import {
  collection,
  getDocs,
  deleteDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import MyFridge from "../components/MyFridge/MyFridge";
import { User } from "firebase/auth";
import Ingredient from "../interfaces/page";

interface IPageProps {
  name: string;
  user: User;
}

const HomePage: React.FC<IPageProps> = (props) => {
  const API_KEY = import.meta.env.VITE_SPOON_API_KEY;

  const { user } = props;

  // Spoonacular API
  const [instructions, setInstructions] = React.useState("");
  React.useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=1&addRecipeInformation=true&instructionsRequired=true&query=chicken`
      );

      const json = await data.json();
      setInstructions(
        JSON.stringify(json.results[0].analyzedInstructions[0].steps)
      );
    }
    fetchData();
  });

  const userFridgeRef = collection(db, "users", user.uid, "fridge");

  const [firestoreData, setFirestoreData] = React.useState<Ingredient[]>([]);
  const [fridgeEdit, setFridgeEdit] = React.useState(false);

  const addFridge = async (item: Ingredient) => {
    const userFridgeItemRef = collection(db, "users", user.uid, "fridge");
    const userFridgeItemDocRef = doc(userFridgeItemRef, item.id.toString());

    await setDoc(userFridgeItemDocRef, item);
    fridgeEdit ? setFridgeEdit(false) : setFridgeEdit(true);
  };

  const removeFridge = async (id: string) => {
    const userFridgeItemRef = doc(db, "users", user.uid, "fridge", id);

    await deleteDoc(userFridgeItemRef);
    fridgeEdit ? setFridgeEdit(false) : setFridgeEdit(true);
  };

  React.useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(userFridgeRef);
      let dbData: Ingredient[] = [];
      querySnapshot.docs.forEach((doc) => {
        dbData.push(doc.data() as Ingredient);
      });
      setFirestoreData(dbData);
      // setFirestoreData(querySnapshot.docs.map((doc) => doc.data() as Ingredient));
    }
    fetchData();
  }, [fridgeEdit]);

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

  return (
    <>
      <div>
        <p>Welcome to this page that is protected by Firebase</p>
        <p>
          Click <Link to="/logout">here</Link> to logout.
        </p>
        <h1>Hello</h1>
        {user.email === null ? <h1>Guest</h1> : <h1>{user.email}</h1>}
        <h2>Fantasy Fridge:</h2>
        {firestoreData.length === 0 ? (
          <p>No items in your Fridge</p>
        ) : (
          <MyFridge
            firestoreData={firestoreData}
            addFridge={addFridge}
            removeFridge={removeFridge}
            user={user}
          />
        )}
      </div>
    </>
  );
};

export default HomePage;
