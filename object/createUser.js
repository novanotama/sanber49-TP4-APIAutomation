const request = require("supertest");
async function createUser(userData, accessToken) {
  try {
    const response = await request("https://kasir-api.belajarqa.com")
      .post('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(userData, accessToken);
    return response;
  } catch (error) {
   // console.error('Error creating user:', error);
    throw error;
  }
}

module.exports = { createUser };