const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const GithubUser = require('../lib/models/GithubUser');

jest.mock('../lib/services/github');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  it('GET /github should return a list of users', async () => {
    const res = await request(app).get('/api/v1/github');
    const userData = await GithubUser.getAll();
    const expected = await userData.map((user) => {
      return { id: user.id, username: user.username, email: user.email, cohort_id: user.cohort_id, role: user.role };
    });
    expect(res.body).toEqual(expected);
  });

  it('GET /github/:id should get a user', async () => {
    const res = await request(app).get('/api/v1/github/1');
    const expected = {
      id: '1',
      username: 'Elliot Darkness',
      email: 'elliot@darkness.com',
      cohort_id: 1,
      role: 'TA'
    };
    expect(res.body).toEqual(expected);
  });

  afterAll(() => {
    pool.end();
  });
});


