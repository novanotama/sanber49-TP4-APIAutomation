const request = require("supertest");

async function selectSingleUser(userId, accessToken) {
  try {
    const response = await request("https://kasir-api.belajarqa.com")
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${accessToken}`);
    //  console.log("Response:", response.body);  
    return response;
  } catch (error) {
  //  console.error('Error selecting a user:', error);
    throw error;
  }
}

module.exports = { selectSingleUser };