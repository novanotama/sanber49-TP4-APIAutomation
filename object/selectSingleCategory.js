const request = require('supertest');

async function selectSingleCategory(categoryId, accessToken) {
  try {
    const response = await request('https://kasir-api.belajarqa.com')
      .get(`/categories/${categoryId}`)
      .set('Authorization', `Bearer ${accessToken}`);
    
    return response;
  } catch (error) {
    console.error('Error selecting single customer:', error); 
    throw error;
  }
}

module.exports = { selectSingleCategory };