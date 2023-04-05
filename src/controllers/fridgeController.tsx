// import { Response } from "express";
// import { db } from ".././config/firebase-config"

// type Fridge = {
//     ingredient: {
//         id: string;
//         calories: number;
//     }
// }

// type Request = {
//     body: Fridge,
//     params: { id: string }
// }

// const getFridge = async (req: Request, res: Response) => {
//     try{
//         const fridge: Fridge[] = [];
//         const querySnapshot = await db.collection('fridge').get();
//         querySnapshot.forEach((doc: any) => fridge.push(doc.data()))
//     return res.status(200).json(fridge);
//     } catch (error: any) {
//         return res.status(500).json(error);
//       }
//     };

// export { getFridge };