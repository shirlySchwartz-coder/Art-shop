const itemsDal = require('../dal/items-dal');

async function getAllItems() {
  let itemsList = await itemsDal.getAllItems();
  return itemsList;
}
async function getItemById(itemId) {
  let item = await itemsDal.getItemById(itemId);
  return item;
}
async function addNewItem(newItem) {
    let item = await itemsDal.addNewItem(newItem);
    return item;
  }

module.exports = {
  getAllItems,
  getItemById,
  addNewItem
};
