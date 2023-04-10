import React from "react";
import { Link } from "react-router-dom";
import { db } from "../config/firebase-config";
import {
  collection,
  getDocs,
  deleteDoc,
  setDoc,
  doc,
  updateDoc,
  increment,
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

  return (
    <>
      <div>
        <p>Welcome to this page that is protected by Firebase</p>
        <p>
          Click <Link to="/logout">here</Link> to logout.
        </p>
        <h1>Hello</h1>
        {user.email === null ? <h1>Guest {user.uid}</h1> : <h1>{user.email}</h1>}
        <h2>Fantasy Fridge:</h2>
        
          <MyFridge
            user={user}
          />
      </div>
    </>
  );
};

export default HomePage;
