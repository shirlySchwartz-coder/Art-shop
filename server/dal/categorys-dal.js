const connection = require('./connection-wrapper');
const ServerError = require('../middleware/errors/server-error');

async function getAllCategory() {
  try {
    const sql = `SELECT category_id as categoryId,  category_name as categoryName FROM category;`;
    const categoryList = await connection.execute(sql);
    return categoryList;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(), e);
  }
}

async function addNewCategory(categoryName) {
  try {
    let parameters = [categoryName];
    const sql = `INSERT INTO category(category_name)
      VALUES (?)`;
    const category = await connection.executeWithParameters(sql, parameters);
    return category;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(), error);
  }
}
async function getCategoryById(categoryId) {
  try {
    let parameters = categoryId;
    const sql = `SELECT category_id as categoryId,  category_name as categoryName FROM category
      where category_id= ?`;
    const category = await connection.executeWithParameters(sql, parameters);
    return category;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(), error);
  }
}

module.exports = {
  getAllCategory,
  addNewCategory,
  getCategoryById,
};
