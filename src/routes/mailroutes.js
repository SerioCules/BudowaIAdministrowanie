const express = require('express')
const router = express.Router()

module.exports = function (controller) {
  router.get('/mail', async (req, res) => {
    try {
      const content =  await controller.build(req.query.email)
      res.set('Content-Type', 'text/html').send(content.html)
    } catch (e) {
      res.status(400).send(e.message)
    }
  })

  router.post('/mail', async (req, res) => {
    try {
      const content =  await controller.build(req.query.email)
      await controller.send(req.query.email, content.html)
      res.status(200).end()
    } catch (e) {
      res.status(400).send(e.message)
    }
  })

  return router
}