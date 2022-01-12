const express = require('express');
const res = require('express/lib/response');
require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe')

exports.homepage = async (req,res)=>{
    try{

        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        const recipies = await Recipe.find({}).sort({_id:-1}).limit(limitNumber);
        const food = {recipies};
         res.render('index',{categories,food});
    }catch(err)
    {
        res.status(500).sned({message : err.message || 'Error occured ...'})
    }
   
}



exports.allCategories = async (req,res)=>{

    try{
        const limitNumber = 20;
        const allCategories = await Category.find({}).limit(limitNumber);
        res.render('categories',{allCategories});

    }catch(err)
    {
        res.status(500).send({message: err.message || 'Error occured ...'})
    }
}

exports.exploreRecipe = async(req, res) => {
  try {
    let recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    res.render('recipe', {recipe } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 

exports.categoryById = async (req,res)=>{

        try{

            let categoryId = req.params.id;
            const categoryById = await Recipe.find({'category':categoryId });
            res.render('categories',{categoryById});

        }catch(err){
              res.satus(500).send({message: error.message || "Error Occured" });   
        }
}

//Search ...

exports.searchRecipe = async(req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    let recipe = await Recipe.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
    res.render('search',{recipe});
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
  
}

exports.exploreLatesr = async (req,res)=>{

  try{

      const recipe = await Recipe.find({}).sort({_id:-1});
      res.render('explore-latest',{recipe});kt

  }catch(err){
      res.status(500).send({message: err.message || "Error Occured"})
  }
}

exports.exploreRandom = async (req,res)=>{
  try{
        let count = await Recipe.find().countDocuments();
        let random = Math.floor(Math.random() * count);
        let recipe = await Recipe.findOne().skip(random).exec();

        res.render('explore-random',{recipe});

  }catch(err)
  {
    res.status(5000).send({message:err.message ||"Error Occured"});
  }
}

// we will include here some flash messages : 
exports.submitRecipe = async (req,res)=>{

      try{  
            const infoErrorsObj = req.flash('infoErrors');
            const infoSubmitObj = req.flash('infoSubmit');
              res.render('submit-recipe',{infoErrorsObj,infoSubmitObj});

      }catch(err)
      {
        res.status(500).send({message: err.message || "Error Occured"});
      }
}

exports.submitRecipePost = async (req,res)=>{

      try{
            let imageUploadFile;
            let uploadPath;
            let newImageName;

            if(!req.files || Object.keys(req.files).length === 0){
              console.log('No Files where uploaded.');
            } else {

              imageUploadFile = req.files.image;
              newImageName = Date.now() + imageUploadFile.name;

              uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

              imageUploadFile.mv(uploadPath, function(err){
                if(err) return res.satus(500).send(err);
              })

            }
          const newRecipe = new Recipe({

                name : req.body.name,
                description : req.body.description,
                email: req.body.email,
                ingredients: req.body.email,
                category: req.body.category,
                image : newImageName
          })

          await newRecipe.save();

          req.flash('infoSubmit','Recipe has been added');
          res.redirect('/submit-recipe');

      }catch(err)
      {
         req.flash('infoErrors',err);
          res.redirect('/submit-recipe');
      }
}



// Delete Recipe
// async function deleteRecipe(){
//   try {
//     await Recipe.deleteOne({ name: 'New Recipe From Form' });
//   } catch (error) {
//     console.log(error);
//   }
// }
// deleteRecipe();


// Update Recipe
// async function updateRecipe(){
//   try {
//     const res = await Recipe.updateOne({ name: 'New Recipe' }, { name: 'New Recipe Updated' });
//     res.n; // Number of documents matched
//     res.nModified; // Number of documents modified
//   } catch (error) {
//     console.log(error);
//   }
// }
// updateRecipe();











































// async function insertDymmyCategoryData(){

//         try{    

//             await Category.insertMany([
//                   {
//         "name": "Thai",
//         "image": "thai-food.jpg"
//       },
//       {
//         "name": "American",
//         "image": "american-food.jpg"
//       }, 
//       {
//         "name": "Chinese",
//         "image": "chinese-food.jpg"
//       },
//       {
//         "name": "Mexican",
//         "image": "mexican-food.jpg"
//       }, 
//       {
//         "name": "Indian",
//         "image": "indian-food.jpg"
//       },
//       {
//         "name": "Spanish",
//         "image": "spanish-food.jpg"
//       },
//       {
//            "name": "Moroccan",
//         "image": "spanish-food.jpg"
//       }
//             ]);
//         }catch(err)
//         {
//             console.log('ERROR:' +err);
//         }
// }
// insertDymmyCategoryData();

// async function insertRecipeData(){

//     try{

//             await Recipe.insertMany([

//                   { 
//                     "name": "Grilled Steak | Chinese",
//                     "description": `Recipe Description Goes Here`,
//                     "email": "recipeemail@raddy.co.uk",
//                     "ingredients": [
//                     "1 level teaspoon baking powder",
//                     "1 level teaspoon cayenne pepper",
//                     "1 level teaspoon hot smoked paprika",
//                     ],
//                     "category": "Chinese", 
//                     "image": "p4.jpg"
//                      },
//              { 
//                     "name": "Lomo Saltado | Chinese",
//                     "description": `Recipe Description Goes Here`,
//                     "email": "recipeemail@raddy.co.uk",
//                     "ingredients": [
//                     "1 level teaspoon baking powder",
//                     "1 level teaspoon cayenne pepper",
//                     "1 level teaspoon hot smoked paprika",
//                     ],
//                     "category": "Chinese", 
//                     "image": "p4.jpg"
//             },
//             ]);

//     }catch(err){
//         res.send('ERROR: '+err)
//     }
// }
// insertRecipeData();