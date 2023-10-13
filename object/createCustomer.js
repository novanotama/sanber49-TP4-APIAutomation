const request = require('supertest');

async function createCustomer(customerData, accessToken) {
  try {
    const response = await request('https://kasir-api.belajarqa.com')
      .post('/customers')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(customerData);

    return response;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
}

module.exports = { createCustomer };