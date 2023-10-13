const { createCustomer } = require('../object/createCustomer');
const { login } = require('../object/login');
const { selectSingleCustomer } = require('../object/selectSingleCustomer');
const { updateCustomer } = require('../object/updateCustomer');
const { deleteCustomer } = require('../object/deleteCustomer');
const chai = require('chai');
const expect = chai.expect;
const loginInfo = require("../data/loginInfo.json");
const customerInfo = require("../data/customerInfo.json");
const customerUpdate = require("../data/customerUpdate.json");



let accessToken;
let response; 
let createdCustomerId ;  

describe('Create Customer', () => {
  before(async () => {
    const loginResponse = await login(loginInfo);
    accessToken = loginResponse.body.data.accessToken;
  });

  it('Response status must 201', async () => {
   
    response = await createCustomer(customerInfo, accessToken);
    expect(response.status).to.equal(201);
    createdCustomerId = response.body.data.customerId;
  });

  it('Status must contain success', async () => {
    response = await createCustomer(customerInfo, accessToken);
    expect(response.body).to.have.property('status').to.equal('success');
  });

  it('Message must contain Customer berhasil ditambahkan', async () => {
    response = await createCustomer(customerInfo, accessToken);  
    expect(response.body).to.have.property('message').to.equal('Customer berhasil ditambahkan');
  });
});
  describe('Create Customer (Negative Tests)', () => {
    it('should handle invalid input data', async () => {
      const invalidCustomerInfo = {}; 
      const response = await createCustomer(invalidCustomerInfo, accessToken);
      expect(response.status).to.equal(400);
    
    });
});

describe('Select Single Customer', () => {
    it('should retrieve the single customer', async () => {
      const selectCustomerResponse = await selectSingleCustomer(createdCustomerId, accessToken);
      expect(selectCustomerResponse.status).to.equal(200);
    });
  });
  describe('Select Single Customer (Negative Tests)', () => {
    it('should handle non-existent customer', async () => {
      const nonExistentCustomerId = 'non_existent_customer_id';
      const response = await selectSingleCustomer(nonExistentCustomerId, accessToken);
      expect(response.status).to.equal(404); 
     
     });
  });

  describe('Update Customer', () => {
    it('should update the created customer', async () => {
      const response = await updateCustomer(createdCustomerId, accessToken, customerUpdate);
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('status').to.equal('success');
      expect(response.body.data).to.have.property('name').to.equal(customerUpdate.name);
      //console.log("Response:", response.body);   
      });
   });
describe('Update Customer (Negative Tests)', () => {
  it('should handle invalid update data', async () => {
    const invalidCustomerUpdate = {}; 
    const response = await updateCustomer(createdCustomerId, accessToken, invalidCustomerUpdate);
    expect(response.status).to.equal(400); 
    
  });
});

describe('Delete Customer', () => {
it('should delete the created customer', async () => {
    const response = await deleteCustomer(createdCustomerId, accessToken);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('status').to.equal('success');
    expect(response.body).to.have.property('data').to.deep.equal({});
    });
  });
describe('Delete Customer (Negative Tests)', () => {
it('should handle non-existent customer for deletion', async () => {
    const nonExistentCustomerId = 'non_existent_customer_id';
    const response = await deleteCustomer(nonExistentCustomerId, accessToken);
    expect(response.status).to.equal(404); 
 
    });
});
