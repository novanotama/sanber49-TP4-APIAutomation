const request = require('supertest');

async function selectSingleCustomer(customerId, accessToken) {
  try {
    const response = await request('https://kasir-api.belajarqa.com')
      .get(`/customers/${customerId}`)
      .set('Authorization', `Bearer ${accessToken}`);
    
    return response;
  } catch (error) {
    console.error('Error selecting single customer:', error);
    throw error;
  }
}

module.exports = { selectSingleCustomer };