import { DocumentData } from "firebase/firestore";


export default interface Ingredient extends DocumentData {
    id: number;
    name: string;
    image: string;
    quantity: number;
  }

  export default interface Recipe extends DocumentData {
    id: number;
    title: string;
    image: string;
  }

export default interface FridgeProps {
    
}


