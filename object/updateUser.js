const request = require("supertest");

async function updateUser(userId, accessToken, userUpdate) {
  try {
    const response = await request("https://kasir-api.belajarqa.com")
      .put(`/users/${userId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(userUpdate);
    return response;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

module.exports = { updateUser };