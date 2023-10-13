const request = require("supertest");

async function deleteUser(userId, accessToken) {
  try {
    const response = await request("https://kasir-api.belajarqa.com")
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${accessToken}`);
    return response;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

module.exports = { deleteUser };