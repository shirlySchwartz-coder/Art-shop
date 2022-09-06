const { request, response, next } = require('express');
const express = require('express');
const categorysLogic = require('../logic/category-logic')

const router = express.Router();
//1. B Get All Categorys
router.get('/', async (request, response, next) => {
  try {
    let categorysList = await categorysLogic.getAllCategory();
    
    response.json(categorysList);
  } catch (error) {
    return next(error);
  }
});
//2. Get One Category by Id
router.get('/:CategoryId', async (request, response, next) => {
    try {
        let categoryId = +request.params.categoryId
      let category = await categorysLogic.getCategoryById(categoryId);
      
      response.json(category);
    } catch (error) {
      return next(error);
    }
  });

  //3. Add New Category
  router.post('/', async (request, response, next) => {
    try {
      let newCategoryName = request.body.categoryName;
      let res = await categorysLogic.addNewCategory(newCategoryName);
      response.json(res);
    } catch (error) {
      return next(error);
    }
  });


  
module.exports = router;
