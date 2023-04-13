# fantasy-fridge
Fantasy Fridge
Fantasy Fridge is a recipe search engine that helps you find recipes based on ingredients in your fridge. With an animated and interactive way to put together a meal, our goal is to make this process as accessible as possible.

Table of Contents
Tech Stack
Getting Started
Installation
Usage
Contributing
License
Tech Stack
Fantasy Fridge is built using the following technologies:

Typescript
Node.js
Firebase
Firestore
Vite
MantineUI
HTML
CSS
Sass
React

Getting Started
To get started with Fantasy Fridge, clone the repository and run the following command:

npm run dev
This will start the development server and open the application in your browser. Please note that this project does not have a backend repository.

Installation
To install and run Fantasy Fridge locally, follow these steps:

Clone the repository:
git clone https://github.com/your-username/fantasy-fridge.git

Install dependencies:
cd fantasy-fridge
npm install
Set up Firebase and Firestore:

Create a new project in Firebase and Firestore
Add the Firebase config object to src/firebase/config.ts
js
Copy code
export const firebaseConfig = {
  // Your Firebase config object here
};
Start the development server:

sh
Copy code
npm run dev

Usage
To use Fantasy Fridge, simply enter the ingredients you have on hand into the search bar. The application will return a list of recipes that can be made using those ingredients. From there, you can view the recipe details and instructions, or save the recipe for later.

Contributing
We welcome contributions from anyone who is interested in improving this project. If you would like to contribute, please follow the contributing guidelines.

License
This project is licensed under the MIT License - see the LICENSE file for details.
