const request = require('supertest');

async function createCategory(categoryData, accessToken) {
  try {
    const response = await request('https://kasir-api.belajarqa.com')
      .post('/categories')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(categoryData);

    return response;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
}

module.exports = { createCategory };