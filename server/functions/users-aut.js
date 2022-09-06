const ServerError = require('../middleware/errors/error-handler');
const crypto = require("crypto");


function validateNewUser(user) {
  if (!user.firstName || user.firstName.length < 3) {
    throw new Error('First name name is missing or to short');
  }
  if (!user.lastName || user.lastName.length < 3) {
    throw new Error('Last name is missing or to short');
  }
  if (!user.email || user.email.length < 3) {
    throw new Error('Email is missing or to short');
  }
  if (!user.idNumber || user.idNumber.length < 9) {
    throw new Error('Id number is missing or to short');
  }
  if (!user.password || user.password.length < 6) {
    throw new Error('Password is missing or to short');
  }
  if (!user.city || user.city.length < 2) {
    throw new Error('City is missing or to short');
  }
  if (user.role) {
    throw new Error('You are restricted from giving a value of role');
  }
}
function setCustomerRole(user) {
    user.role = 'customer'
}
function encryptPassword(password) {
    const saltRight = "sdkjfhdskajh";
    const saltLeft = "--mnlcfs;@!$ ";
    let passwordWithSalt = saltLeft + password + saltRight;
    return crypto.createHash("md5").update(passwordWithSalt).digest("hex");
}
module.exports = {
  validateNewUser,
  setCustomerRole,
  encryptPassword
};
