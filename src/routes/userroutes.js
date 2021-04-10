const express = require('express')
const router = express.Router()

module.exports = function (controller) {
  router.post('/user', async (req, res) => {
    try {
      await controller.add(req.body)
      res.status(200).end()
    } catch (e) {
      res.status(400).send(e.message)
    }
  })

  router.delete('/user', async (req, res) => {
    try {
      await controller.remove(req,body)
    } catch (e) {
      res.status(400).send(e.message)
    }
  })

  router.get('/user', async (req, res) => {
    try {
      const user = await controller.find('')
      res.send(JSON.stringify({ email: user.email, rss: user.rss }))
    } catch (e) {
      res.status(400).send(e.message)
    }
  })

  return router
}