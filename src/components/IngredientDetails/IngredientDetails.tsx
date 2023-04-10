//   // Spoonacular API
//   const [instructions, setInstructions] = React.useState("");
//   React.useEffect(() => {
//     async function fetchData() {
//       const data = await fetch(
//         `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=1&addRecipeInformation=true&instructionsRequired=true&query=chicken`
//       );

//       const json = await data.json();
//       setInstructions(
//         JSON.stringify(json.results[0].analyzedInstructions[0].steps)
//       );
//     }
//     fetchData();
//   });

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