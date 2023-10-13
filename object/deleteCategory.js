const request = require("supertest");

async function deleteCategory(categoryId, accessToken) {
  try {
    const response = await request("https://kasir-api.belajarqa.com")
      .delete(`/categories/${categoryId}`)
      .set('Authorization', `Bearer ${accessToken}`);
    return response;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

module.exports = { deleteCategory };