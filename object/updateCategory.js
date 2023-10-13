const request = require("supertest");

async function updateCategory(categoryId, accessToken, categoryUpdate) {
  try {
    const response = await request("https://kasir-api.belajarqa.com")
      .put(`/categories/${categoryId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(categoryUpdate);
    return response;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

module.exports = { updateCategory };