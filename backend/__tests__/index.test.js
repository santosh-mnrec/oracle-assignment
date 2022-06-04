const request = require('supertest')
const app = require("../index").app;
describe('Post Endpoints', () => {
  it('should create a new task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({

        title: 'test is cool',
        complete: false
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body.title).toEqual('test is cool');

  })
  it('should return all  tasks', async () => {
    const res = await request(app)
      .get('/tasks')

    expect(res.statusCode).toEqual(200)


  })
  it('should return  404 if task does not exits', async () => {
    const res = await request(app)
      .get('/tasks/10')

    expect(res.statusCode).toEqual(404)


  })
  it('should update exiting task', async () => {
    const res = await request(app)
      .put('/tasks/1')
      .send({
        id:1,
        complete: false
      })

    expect(res.statusCode).toEqual(200);
   


  })

});