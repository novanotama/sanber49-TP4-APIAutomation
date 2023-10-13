const { createUnit } = require('../object/createUnit');
const { login } = require('../object/login');
const { selectSingleUnit } = require('../object/selectSingleUnit');
const { updateUnit } = require('../object/updateUnit');
const { deleteUnit } = require('../object/deleteUnit');
const chai = require('chai');
const expect = chai.expect;
const loginInfo = require("../data/loginInfo.json");
const unitInfo = require("../data/unitInfo.json");
const unitUpdate = require("../data/unitUpdate.json");


let accessToken;
let response; 
let createdunitId ;  

describe('Create Unit', () => {
  before(async () => {
    const loginResponse = await login(loginInfo);
    accessToken = loginResponse.body.data.accessToken;
  });

  it('Response status must 201', async () => {
   
    response = await createUnit(unitInfo, accessToken);
    expect(response.status).to.equal(201);
    createdunitId = response.body.data.unitId;
  });

  it('Status must contain success', async () => {
    response = await createUnit(unitInfo, accessToken);
    expect(response.body).to.have.property('status').to.equal('success');
  });

  it('Message must contain Unit berhasil ditambahkan', async () => {
    response = await createUnit(unitInfo, accessToken);  
    expect(response.body).to.have.property('message').to.equal('Unit berhasil ditambahkan');
  });
});
  describe('Create Unit (Negative Tests)', () => {
    it('should handle invalid input data', async () => {
      const invalidUnitInfo = {}; 
      const response = await createUnit (invalidUnitInfo, accessToken);
      expect(response.status).to.equal(400);
    
    });
});

describe('Select Single Unit', () => {
    it('should retrieve the single unit', async () => {
      const selectUnitResponse = await selectSingleUnit(createdunitId, accessToken);
      expect(selectUnitResponse.status).to.equal(200);
    });
  });
  describe('Select Single Unit (Negative Tests)', () => {
    it('should handle non-existent category', async () => {
      const nonExistentUnitId = 'non_existent_unit_id';
      const response = await selectSingleUnit(nonExistentUnitId, accessToken);
      expect(response.status).to.equal(404); 
     
     });
  });

  describe('Update Unit', () => {
    it('should update the created unit', async () => {
      const response = await updateUnit(createdunitId, accessToken, unitUpdate);
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('status').to.equal('success');
      expect(response.body.data).to.have.property('name').to.equal(unitUpdate.name);
      //console.log("Response:", response.body);   
      });
   });
describe('Update Unit (Negative Tests)', () => {
  it('should handle invalid update data', async () => {
    const invalidUnitUpdate = {}; 
    const response = await updateUnit(createdunitId, accessToken, invalidUnitUpdate);
    expect(response.status).to.equal(400); 
    
  });
});

describe('Delete Unit', () => {
it('should delete the created unit', async () => {
    const response = await deleteUnit(createdunitId, accessToken);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('status').to.equal('success');
    expect(response.body).to.have.property('data').to.deep.equal({});
    });
  });
describe('Delete Unit (Negative Tests)', () => {
it('should handle non-existent unit for deletion', async () => {
    const nonExistentUnitId = 'non_existent_unit_id';
    const response = await deleteUnit(nonExistentUnitId, accessToken);
    expect(response.status).to.equal(404); 
 
    });
});
