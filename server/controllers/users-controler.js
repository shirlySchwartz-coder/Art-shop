const express = require('express');
const router = express.Router();
const usersLogic = require('../logic/users-logic');

router.post('/', async (request, response, next) => {
  try {
    let newUser = request.body;
    let res = await usersLogic.registerUser(newUser);
    response.json(res);
  } catch (error) {
    return next(error);
  }
});

router.post('/login', async (request, response, next) => {
  try {
    let userLoginData = request.body;
    let loginResponse = await usersLogic.login(userLoginData);
    response.json(loginResponse);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
