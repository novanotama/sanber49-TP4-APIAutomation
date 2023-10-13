const { createCategory } = require('../object/createCategory');
const { login } = require('../object/login');
const { selectSingleCategory } = require('../object/selectSingleCategory');
const { updateCategory } = require('../object/updateCategory');
const { deleteCategory } = require('../object/deleteCategory');
const chai = require('chai');
const expect = chai.expect;
const loginInfo = require("../data/loginInfo.json");
const categoryInfo = require("../data/categoryInfo.json");
const categoryUpdate = require("../data/categoryUpdate.json");



let accessToken;
let response; 
let createdCategoryId ;  

describe('Create Category', () => {
  before(async () => {
    const loginResponse = await login(loginInfo);
    accessToken = loginResponse.body.data.accessToken;
  });

  it('Response status must 201', async () => {
   
    response = await createCategory(categoryInfo, accessToken);
    expect(response.status).to.equal(201);
    createdCategoryId = response.body.data.categoryId;
  });

  it('Status must contain success', async () => {
    response = await createCategory(categoryInfo, accessToken);
    expect(response.body).to.have.property('status').to.equal('success');
  });

  it('Message must contain Customer berhasil ditambahkan', async () => {
    response = await createCategory(categoryInfo, accessToken);  
    expect(response.body).to.have.property('message').to.equal('Category berhasil ditambahkan');
  });
});
  describe('Create Category (Negative Tests)', () => {
    it('should handle invalid input data', async () => {
      const invalidCategoryInfo = {}; 
      const response = await createCategory(invalidCategoryInfo, accessToken);
      expect(response.status).to.equal(400);
    
    });
});

describe('Select Single Category', () => {
    it('should retrieve the single category', async () => {
      const selectCategoryResponse = await selectSingleCategory(createdCategoryId, accessToken);
      expect(selectCategoryResponse.status).to.equal(200);
    });
  });
  describe('Select Single Category (Negative Tests)', () => {
    it('should handle non-existent category', async () => {
      const nonExistentCategoryId = 'non_existent_category_id';
      const response = await selectSingleCategory(nonExistentCategoryId, accessToken);
      expect(response.status).to.equal(404); 
     
     });
  });

  describe('Update Category', () => {
    it('should update the created category', async () => {
      const response = await updateCategory(createdCategoryId, accessToken, categoryUpdate);
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('status').to.equal('success');
      expect(response.body.data).to.have.property('name').to.equal(categoryUpdate.name);
      //console.log("Response:", response.body);   
      });
   });
describe('Update Category (Negative Tests)', () => {
  it('should handle invalid update data', async () => {
    const invalidCategoryUpdate = {}; 
    const response = await updateCategory(createdCategoryId, accessToken, invalidCategoryUpdate);
    expect(response.status).to.equal(400); 
    
  });
});

describe('Delete Category', () => {
it('should delete the created category', async () => {
    const response = await deleteCategory(createdCategoryId, accessToken);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('status').to.equal('success');
    expect(response.body).to.have.property('data').to.deep.equal({});
    });
  });
describe('Delete Category (Negative Tests)', () => {
it('should handle non-existent category for deletion', async () => {
    const nonExistentCategoryId = 'non_existent_customer_id';
    const response = await deleteCategory(nonExistentCategoryId, accessToken);
    expect(response.status).to.equal(404); 
 
    });
});
