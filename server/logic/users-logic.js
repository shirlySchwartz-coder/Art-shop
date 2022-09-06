const usersDal = require('../dal/users-dal');
const {
  validateNewUser,
  encryptPassword,
  setCustomerRole,
} = require('../functions/users-aut');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

async function registerUser(user) {
  validateNewUser(user);
  let userExist = await usersDal.isUserEmailExist(user);
  if (userExist) {
    throw new Error('User alredy exist');
  }
  setCustomerRole(user);
  user.password = encryptPassword(user.password);
  let response = await usersDal.registerUser(user);
  return response;
}

async function login(user) {
  user.password = encryptPassword(user.password);
  let userData = await usersDal.login(user);
  if (!userData) {
    throw new Error('Login failed');
  }
  const token = jwt.sign({ userId: userData.id, role: userData.role}, config.secret);
  let tokenWithUserData = {token, firstName: userData.firstName, lastName: userData.lastName};
  return tokenWithUserData;
}

module.exports = {
  registerUser,
  login,
};
