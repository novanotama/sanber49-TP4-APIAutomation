const request = require("supertest");

async function deleteCustomer(customerId, accessToken) {
  try {
    const response = await request("https://kasir-api.belajarqa.com")
      .delete(`/customers/${customerId}`)
      .set('Authorization', `Bearer ${accessToken}`);
    return response;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

module.exports = { deleteCustomer };