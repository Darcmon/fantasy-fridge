import React from 'react';
import { db } from '../../config/firebase-config';
import { collection, getDocs, deleteDoc, setDoc, doc, updateDoc, increment } from 'firebase/firestore';
import Ingredient from '../../interfaces/page';
import { Button } from '@mantine/core';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { User } from 'firebase/auth';
import KitchenIcon from '@mui/icons-material/Kitchen';


interface FridgeEditProps {
  item: Ingredient;
  user: User;
}
 
const FridgeEdit: React.FC<FridgeEditProps> = (props) => {
    const [firestoreFridgeData, setFirestoreFridgeData] = React.useState<Ingredient[]>([]);
  const [fridgeEdit, setFridgeEdit] = React.useState(false);
  const { user, item } = props;

  const userFridgeRef = collection(db, "users", user.uid, "fridge");


const addFridge = async (item: Ingredient, quantity: number) => {
    const userFridgeItemRef = collection(db, "users", user.uid, "fridge");
    const userFridgeItemDocRef = doc(userFridgeItemRef, item.id.toString());
  
    await setDoc(userFridgeItemDocRef, item);
    await setDoc(userFridgeItemDocRef, { quantity: 0 }, { merge: true });

    fridgeEdit ? setFridgeEdit(false) : setFridgeEdit(true);
  };

  const updateFridge = async (id: string, name: string) => {
    const userFridgeItemQtyRef = collection(db, "users", user.uid, "fridge");
    const userFridgeItemQtyDocRef = doc(userFridgeItemQtyRef, id.toString());

    if (name === "subtract") {
      // decrease the quantity of the item in the fridge
      await updateDoc(userFridgeItemQtyDocRef, { quantity: increment(-1) });
    } else if (name === "add") {
      // increase the quantity of the item in the fridge
      await updateDoc(userFridgeItemQtyDocRef, { quantity: increment(1) });
    }

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
      setFirestoreFridgeData(dbData);
      // setFirestoreFridgeData(querySnapshot.docs.map((doc) => doc.data() as Ingredient));
    }
    fetchData();
  }, [fridgeEdit]);

  const filteredFridgeData = firestoreFridgeData.filter(
    (firestoreItem) => firestoreItem.id === item.id
  );
    return ( 
        <>
        {filteredFridgeData.length > 0 ? (
                    <>
                    <Button
                      color="red"
                      onClick={() => removeFridge(item.id.toString())}
                      leftIcon={<KitchenIcon />}
                    >
                      Rm
                    </Button>
                    <Button
                      onClick={() =>
                        updateFridge(item.id.toString(), "subtract")
                      }
                      name="subtract"
                    >
                      -
                    </Button>
                    <p>{filteredFridgeData[0].quantity}</p>
                    <Button
                      onClick={() => updateFridge(item.id.toString(), "add")}
                      name="add"
                    >
                      +
                    </Button>
                  </>
              ) : (
                <Button
                  onClick={() => addFridge(item, 0)}
                  leftIcon={<KitchenIcon />}
                >
                  Add
                </Button>
              )}
        </>
     );
};
 
export default FridgeEdit;
