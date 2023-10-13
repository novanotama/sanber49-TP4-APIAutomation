const { login } = require('../object/login');
const chai = require('chai');
const expect = chai.expect;
const loginInfo = require("../data/loginInfo.json");

describe('Login API', () => {
  let response;

  before(async () => {
    response = await login(loginInfo);
    process.env.ACCESS_TOKEN = response.body.data.accessToken;  
  });

  it('should authenticate and get a token', async () => {
    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('data');
    expect(response.body.data).to.have.property('accessToken');
  });

  it('should use the saved access token', async () => {
  });
});