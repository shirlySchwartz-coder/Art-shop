const connection = require('./connection-wrapper');
const ServerError = require('../middleware/errors/server-error');

async function getAllItems() {
  try {
    const sql = `SELECT i.item_id as itemId, i.item_name as itemName, i.price , i.picture,
    c.category_name as categoryName
    FROM items i 
    inner join category c
    on i.fk_category_id= c.category_id`;
    const itemsList = await connection.execute(sql);
    return itemsList;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(), e);
  }
}
async function getItemById(itemId) {
  try {
    let parameters = itemId
    const sql = `SELECT i.item_id as itemId, i.item_name as itemName, i.price , i.picture,
    c.category_name as categoryName
    FROM items i 
    inner join category c
    on i.fk_category_id= c.category_id
    where item_id= ?`;
    const item = await connection.executeWithParameters(sql,parameters );
    return item;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(), e);
  }
}

async function addNewItem(newItem) {
    try {
    
      let sql = `INSERT INTO items
      (item_name, fk_category_id, price ,picture)
      VALUES(?,?,?,?)`;
      let parameters = [
        newItem.itemName,
        newItem.categoryId,
        newItem.price,
        newItem.picture
      ];
      let item = await connection.executeWithParameters(sql, parameters);
      console.log(item);
      return item;
    } catch (error) {
      throw new ServerError(error);
    }
  }

module.exports = {
  getAllItems,
  getItemById,
  addNewItem
};
