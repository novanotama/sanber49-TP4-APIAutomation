const request = require('supertest');

async function selectSingleUnit(unitId, accessToken) {
  try {
    const response = await request('https://kasir-api.belajarqa.com')
      .get(`/units/${unitId}`)
      .set('Authorization', `Bearer ${accessToken}`);
    
    return response;
  } catch (error) {
    console.error('Error selecting single customer:', error); 
    throw error;
  }
}

module.exports = { selectSingleUnit };