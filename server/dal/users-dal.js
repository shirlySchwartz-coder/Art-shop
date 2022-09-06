let connection = require('./connection-wrapper');
const ServerError = require('../middleware/errors/server-error');

async function registerUser(User) {
  try {
    let newUser = User;
    let sql = `INSERT INTO users(first_name,last_name,email,id_number,password,city,role)
    VALUES(?,?,?,?,?,?,?)`;
    let parameters = [
      newUser.firstName,
      newUser.lastName,
      newUser.email,
      newUser.idNumber,
      newUser.password,
      newUser.city,
      newUser.role,
    ];
    let user = await connection.executeWithParameters(sql, parameters);
    console.log(user);
    return user;
  } catch (error) {
    throw new ServerError(error);
  }
}

async function isUserEmailExist(user) {
  let sql = 'SELECT user_id as userId from users where email = ?';
  let parameters = [user.email];
  let users = await connection.executeWithParameters(sql, parameters);

  if (users && users.length > 0) {
    return true;
  }
  return false;
}

async function login(user) {
  let sql = `SELECT user_id as userId , email , first_name as firstName, last_name as lastName 
  from users where email = ? and password = ?`;
  let parameters = [user.email, user.password];
  let [userData] = await connection.executeWithParameters(sql, parameters);

  if (!userData) {
    return null;
  }
  return userData;
}

module.exports = {
  registerUser,
  isUserEmailExist,
  login,
};
