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

import React from 'react';
import './IngredientDetails.scss';

interface SvgProps {
  name: string;
}
interface IngredientDetailsProps {
    name: string;
  }

const Svg: React.FC<SvgProps> = ({ name }) => (
  <svg className={`icon ${name}`}>
    <use xlinkHref={`https://image.flaticon.com/icons/svg/134/134105.svg#${name}`} />
  </svg>
);

const IngredientDetails: React.FC<IngredientDetailsProps> = (props) => (
  <div className="ft-recipe">
    <div className="ft-recipe__thumb">
      <span id="close-modal">
        <i className="ion ion-md-close"></i>
      </span>
      <h3>Recipe</h3>
      <img
        src="https://zippypaws.com/app/uploads/2018/05/strawberry-waffles-1024x668.jpg"
        alt="Strawberry Waffle"
      />
    </div>
    <div className="ft-recipe__content">
      <header className="content__header">
        <div className="row-wrapper">
          <h2 className="recipe-title">Strawberry Waffle</h2>
          <div className="user-rating"></div>
        </div>
        <ul className="recipe-details">
          <li className="recipe-details-item time">
            <Svg name="ion-ios-clock-outline" />
            <span className="value">20</span>
            <span className="title">Minutes</span>
          </li>
          <li className="recipe-details-item ingredients">
            <Svg name="ion-ios-book-outline" />
            <span className="value">5</span>
            <span className="title">Ingredients</span>
          </li>
          <li className="recipe-details-item servings">
            <Svg name="ion-ios-person-outline" />
            <span className="value">4-6</span>
            <span className="title">Serving</span>
          </li>
        </ul>
      </header>
      <p className="description">
        There’s no better way to celebrate May being National Strawberry Month than by sharing a sweet treat with your pup!!!
        Strawberries...
      </p>
      <footer className="content__footer">
        <a href="#">View Recipe</a>
      </footer>
    </div>
  </div>
);

export default IngredientDetails;
