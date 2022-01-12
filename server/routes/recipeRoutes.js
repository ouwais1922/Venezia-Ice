const express = require('express')
const router = express.Router()
const recipeController = require('../controllers/recipeController')

// all the get routes:
router.get('/',recipeController.homepage);
router.get('/categories',recipeController.allCategories);
router.get('/categories/:id',recipeController.categoryById);
router.get('/recipe/:id',recipeController.exploreRecipe);
router.get('/explore-latest',recipeController.exploreLatesr);
router.get('/explore-random',recipeController.exploreRandom);
router.get('/submit-recipe',recipeController.submitRecipe);
// all the post routes : 
router.post('/search',recipeController.searchRecipe);
router.post('/submit-recipe',recipeController.submitRecipePost);



module.exports = router
