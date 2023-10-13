const request = require("supertest");

async function deleteUnit(unitId, accessToken) {
  try {
    const response = await request("https://kasir-api.belajarqa.com")
      .delete(`/units/${unitId}`)
      .set('Authorization', `Bearer ${accessToken}`);
    return response;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

module.exports = { deleteUnit };