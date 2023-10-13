const { createUser } = require('../object/createUser');
const { login } = require('../object/login');
const { selectSingleUser } = require('../object/selectSingleUser');
const { updateUser } = require('../object/updateUser');
const { deleteUser } = require('../object/deleteUser');  
const chai = require('chai');
const expect = chai.expect;
const userInfo = require("../data/userInfo.json");
const loginInfo = require("../data/loginInfo.json");
const userUpdate = require("../data/userUpdate.json");

let accessToken;
let response; 
let createdUserId ;  
describe('Create User', () => {
  before(async () => {
    const loginResponse = await login(loginInfo);
    accessToken = loginResponse.body.data.accessToken;
  });

  it('Response status must 201', async () => {
    const userData = userInfo;
    response = await createUser(userData, accessToken);
    expect(response.status).to.equal(201);
    createdUserId = response.body.data.userId;  
  });

  it('Status must contain success', async () => {
    const userData = userInfo;
    response = await createUser(userData, accessToken);
    expect(response.body).to.have.property('status').to.equal('success');
  });

  it('Message must contain User berhasil ditambahkan', async () => {
    const userData = userInfo;
    response = await createUser(userData, accessToken);  
    expect(response.body).to.have.property('message').to.equal('User berhasil ditambahkan');
    //console.log("Response:", response.body);  
  });
});
describe('Create User (Negative)', () => {
  it('should return 400 for invalid user data', async () => {
    const invalidUserData = { email: '', password: '123' };  // Invalid user data
    const response = await createUser(invalidUserData, accessToken);
    expect(response.status).to.equal(400);
  });
});

describe('Select Single User', () => {
  it('should retrieve a single user', async () => {
    const selectUserResponse = await selectSingleUser(createdUserId, accessToken);
    expect(selectUserResponse.status).to.equal(200);
    expect(selectUserResponse.body).to.have.property('data');
    expect(selectUserResponse.body.data).to.have.property('user');
    const user = selectUserResponse.body.data.user;
    expect(user).to.have.property('id').that.is.a('string');
    expect(user).to.have.property('name').that.is.a('string');
    expect(user).to.have.property('email').that.is.a('string');
    expect(user).to.have.property('role').that.is.a('string');
    });
  }); 
  describe('Select Single User (Negative)', () => {
    it('should return 404 for nonexistent user', async () => {
      const invalidUserId = 'invalidUserId';  // invalid userId
      const selectUserResponse = await selectSingleUser(invalidUserId, accessToken);
      expect(selectUserResponse.status).to.equal(404);
    });
  });

describe('Update User', () => {
  it('should update the created user', async () => {
    const response = await updateUser(createdUserId, accessToken, userUpdate);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('status').to.equal('success');
    expect(response.body).to.have.property('message').to.equal('User berhasil diupdate');
    expect(response.body.data).to.have.property('name').to.equal(userUpdate.name);
    //console.log("Response:", response.body);   
    });
 });
describe('Update User (Negative)', () => {
  it('should return 400 for invalid update data', async () => {
    const invalidUpdateData = { name: '', email: 'invalid-email' };  // Invalid update data
    const response = await updateUser(createdUserId, accessToken, invalidUpdateData);
    expect(response.status).to.equal(400);
  });
});

describe('Delete User', () => {
  it('should delete the created user', async () => {
    const response = await deleteUser(createdUserId, accessToken);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('status').to.equal('success');
    expect(response.body).to.have.property('message').to.equal('User berhasil dihapus');
  });
});
describe('Delete User (Negative)', () => {
  it('should return 404 for nonexistent user', async () => {
    const invalidUserId = 'invalidUserId';  // invalid userId
    const response = await deleteUser(invalidUserId, accessToken);
    expect(response.status).to.equal(404);
  });
});