import { DocumentData } from "firebase/firestore";


export default interface Ingredient extends DocumentData {
    id: number;
    name: string;
    image: string;
  }

export default interface FridgeProps {
    
}


