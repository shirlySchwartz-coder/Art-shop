const categoryDal = require('../dal/categorys-dal');

async function getAllCategory() {
  let categoryList = await categoryDal.getAllCategory();
  return categoryList;
}
async function addNewCategory(categoryName) {
  let category = await categoryDal.addNewCategory(categoryName);
  return category;
}
async function getCategoryById(categoryId) {
    let category = await categoryDal.getCategoryById(categoryId);
    return category;
  }
module.exports = {
  getAllCategory,
  addNewCategory,
  getCategoryById
};
