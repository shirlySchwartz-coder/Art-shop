const { request, response, next } = require('express');
const express = require('express');
const itemsLogic = require('../logic/items-logic')

const router = express.Router();
//1. B Get All Items
router.get('/', async (request, response, next) => {
  try {
    let itemsList = await itemsLogic.getAllItems();
    console.log(itemsList);
    response.json(itemsList);
  } catch (error) {
    return next(error);
  }
});
//2. Get One Item by Id
router.get('/:itemId', async (request, response, next) => {
    try {
        let itemId = +request.params.itemId
      let item = await itemsLogic.getItemById(itemId);
      
      response.json(item);
    } catch (error) {
      return next(error);
    }
  });

  //3. Add New Item
  router.post('/', async (request, response, next) => {
    try {
      let newItem = request.body;
      let res = await itemsLogic.addNewItem(newItem);
      response.json(res);
    } catch (error) {
      return next(error);
    }
  });


  
module.exports = router;
