import React from 'react';
import { db } from '../../config/firebase-config';
import { collection, getDocs, deleteDoc, setDoc, doc } from 'firebase/firestore';
import Ingredient from '../../interfaces/page';
import { Button, Stack } from '@mantine/core';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { User } from 'firebase/auth';


interface CartEditProps {
  item: Ingredient;
  user: User;
}
 
const CartEdit: React.FC<CartEditProps> = (props) => {
    const [firestoreCartData, setFirestoreCartData] = React.useState<Ingredient[]>([]);
  const [cartEdit, setCartEdit] = React.useState(false);
  const { user, item } = props;

  const userCartRef = collection(db, "users", user.uid, "cart");


const addCart = async (item: Ingredient) => {
    const userCartItemRef = collection(db, "users", user.uid, "cart");
    const userCartItemDocRef = doc(userCartItemRef, item.id.toString());
  
    await setDoc(userCartItemDocRef, item);
    cartEdit ? setCartEdit(false) : setCartEdit(true);
  };

  const removeCart = async (id: string) => {
    const userCartItemRef = doc(db, "users", user.uid, "cart", id);

    await deleteDoc(userCartItemRef);
    cartEdit ? setCartEdit(false) : setCartEdit(true);
  };

  React.useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(userCartRef);
      let dbData: Ingredient[] = [];
      querySnapshot.docs.forEach((doc) => {
        dbData.push(doc.data() as Ingredient);
      });
      setFirestoreCartData(dbData);
      // setFirestoreCartData(querySnapshot.docs.map((doc) => doc.data() as Ingredient));
    }
    fetchData();
  }, [cartEdit]);

  const filteredCartData = firestoreCartData.filter(
    (firestoreItem) => firestoreItem.id === item.id
  );
    return ( 
        <>
        {filteredCartData.length > 0 ? (
          <Stack align='center' justify='center'
          spacing='xl'
          >
                  <Button
                  compact
                    color="red"
                    onClick={() => removeCart(item.id.toString())}
                    rightIcon={<MenuBookIcon />}
                  ></Button>
                  </Stack>
              ) : (
                <Stack align='center' justify='center'
                spacing='xl'>
                <Button
                compact
                  onClick={() => addCart(item)}
                  leftIcon={<MenuBookIcon />}
                ></Button>
                </Stack>
              )}
        </>
     );
};
 
export default CartEdit;
