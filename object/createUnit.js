const request = require('supertest');

async function createUnit(unitData, accessToken) {
  try {
    const response = await request('https://kasir-api.belajarqa.com')
      .post('/units')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(unitData);

    return response;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
}

module.exports = { createUnit };