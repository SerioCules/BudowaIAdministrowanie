// /* eslint-disable no-undef */
// const UserController = require('../../src/controllers/usercontroller')
// const Database = require('../../src/storage/database')

// jest.mock('express')
// jest.mock('../../src/storage/database')

// describe('UserController', () => {
//   const email = 'test@email.com'
//   const rss = ['test.rss.xml']

//   it('adds user', async () => {
//     const req = require('express').request
//     req.body = { email, rss }

//     const res = require('express').response
//     res.status = jest.fn().mockImplementation((_) => res)
//     res.end = jest.fn().mockImplementation((_) => res)

//     const db = new Database()
//     db.insert = jest.fn()

//     const controller = new UserController(db)
//     await controller.add(req, res)

//     expect(db.insert).toHaveBeenCalledWith('user', { email, rss })
//     expect(res.status).toHaveBeenCalledWith(200)
//     expect(res.end).toHaveBeenCalledTimes(1)
//   })

//   it('finds user', async () => {
//     const req = require('express').request
//     req.query = { email }

//     const res = require('express').response
//     res.send = jest.fn().mockImplementation((_) => {
//       return res
//     })

//     const db = new Database()
//     db.find = jest.fn().mockImplementation(() => {
//       return { email, rss }
//     })

//     const controller = new UserController(db)
//     await controller.find(req, res)

//     expect(db.find).toHaveBeenCalledWith('user', email)
//     expect(res.send).toHaveBeenCalledWith(JSON.stringify({ email, rss }))
//   })

//   it('removes user', async () => {
//     const req = require('express').request
//     req.body = { email }

//     const res = require('express').response
//     res.send = jest.fn().mockImplementation((_) => res)
//     res.end = jest.fn().mockImplementation((_) => res)

//     const db = new Database()
//     db.remove = jest.fn()

//     const controller = new UserController(db)
//     await controller.remove(req, res)

//     expect(db.remove).toHaveBeenCalledWith('user', { email })
//     expect(res.status).toHaveBeenCalledWith(200)
//     expect(res.end).toHaveBeenCalledTimes(1)
//   })
// })