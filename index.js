const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

//Method 1 : Using Async Await

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    // Run your code here, after you have insured that the connection was made
    
    // Iteration 2 Create Recipe
    let cozido = {
      title: 'Cozido', 
      level: 'Easy Peasy',  
      ingredients: ['carnes', 'enchidos', 'feijão', 'arroz'], 
      cuisine: 'Portuguese', 
      dishType: 'main_course',  
      image:'https://www.pingodoce.pt/wp-content/uploads/2015/03/cozido-a-portuguesa-617.jpg', 
      duration: 180,
      creator: 'Povo Português'
    };
     const recipe = await Recipe.create(cozido);
     console.log(recipe);

    //Iteration 3 - Insert multiple recipes
    let allRecipes = await Recipe.insertMany(data);
    console.log(allRecipes);

    //Iteration 4 - Update recipe
    let updateRecipe = await Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese'}, {duration:100});
    console.log(updateRecipe);
    console.log('Success');

    //Iteration 5 - Remove a recipe
    let deleteRecipe = await Recipe.deleteOne({title:"carrotCake"});
    console.log(deleteRecipe);

    //Iteration 6 - Close the Database
    mongoose.disconnect();


  } catch (error) {
    console.log(error);
  }
};

manageRecipes();

//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */
