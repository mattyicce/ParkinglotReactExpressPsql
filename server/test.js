const server = require('./index.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

describe('User Endpoints', () => {

  it('GET /spots should show all users', async () => {
    const res = await requestWithSupertest.get('/spots');
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining('json'));
      console.log(res.body[0])
      expect(res.body[0]).toHaveProperty('car')
  });
});