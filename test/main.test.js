require('dotenv').config();
const request = require('supertest');
const app = require('../app');

describe('front page', function () {
  test('[NO AUTH] GET / should return 200', () => {
    request(app).get('/').expect(200);
  });
});

describe('API', function () {
  let token = '';
  test('[NO AUTH] POST /api/authenticate should return token', async () => {
    const res = await request(app)
      .post('/api/authenticate')
      .send({
        email: 'user@example.com',
        password: '1234',
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  test('[AUTH] GET /api/adverts with auth token should return adverts', () => {
    request(app)
      .get('/api/adverts')
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(200);
  });

  test('[NO AUTH] GET /api/adverts without token should return Unauthorized', async () => {
    const res = await request(app)
      .get('/api/adverts')
      .expect('Content-Type', /json/)
      .expect(401);

    expect(res.body.error).toBe('Authentication token not found');
  });

  test('[AUTH] GET /api/adverts with wrong auth token should return Unauthorized', () => {
    request(app)
      .get('/api/adverts')
      .set('Authorization', 'false.token')
      .expect('Content-Type', /json/)
      .expect(401);
  });
});
