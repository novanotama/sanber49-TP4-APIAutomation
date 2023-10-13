const request = require("supertest");

async function updateUnit(unitId, accessToken, unitUpdate) {
  try {
    const response = await request("https://kasir-api.belajarqa.com")
      .put(`/units/${unitId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(unitUpdate);
    return response;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

module.exports = { updateUnit };