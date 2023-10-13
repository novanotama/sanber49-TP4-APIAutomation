const request = require("supertest");
async function login(payload) {
  //console.log("Sending payload:", payload); 
  try {
    const response = await request("https://kasir-api.belajarqa.com")
    .post("/authentications")
    .send(payload);
    //console.log("Response:", response.body);  
    return response;
  } catch (error) {
   // console.error("Error lOGIN:", error);
    throw error;
  }
}

module.exports = { login };