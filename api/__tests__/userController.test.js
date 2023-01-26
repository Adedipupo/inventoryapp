import dotenv from 'dotenv'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../server'


// dotenv.config()


describe('Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true)
  })
})
/* Closing database connection after each test. */
// afterEach(async () => {
//   await mongoose.connection.close()
// })

/* Connecting to the database before each test. */
// afterEach(async () => {
//     await mongoose.connection.close();
//   });

//   const logUser = {
//     name: 'dipo123',
//     email: 'g@gmail.com',
//     password: '123456',
//   }
//   await supertest(app).post('/api/users/signup').send(logUser)

//   describe('User  Login', () => {
//   it('should create login a registered user', async () => {
//     const logUser = {
//       email: 'g@gmail.com',
//       password: '123456',
//     }
//     const res = await supertest(app).post('/api/users/login').send(logUser)
//     userData.id = res.body._id
//     expect(res.status).toBe(200)
//     expect(res.body).toHaveProperty('status')
//   })
// })
