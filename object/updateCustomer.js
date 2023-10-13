const request = require("supertest");

async function updateCustomer(customerId, accessToken, customerUpdate) {
  try {
    const response = await request("https://kasir-api.belajarqa.com")
      .put(`/customers/${customerId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(customerUpdate);
    return response;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

module.exports = { updateCustomer };