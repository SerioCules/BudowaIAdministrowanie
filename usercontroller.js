const validate = require('jsonschema').validate

const userSchema = require('../schema/userSchema')

const logger = require('../utils/logger')

function User (storage) {
  if (!(this instanceof User)) {
    return new User(storage)
  }

  const _storage = storage

  this.add = async (req, res) => {
    logger.debug({ label: 'USER CONTROLLER', message: 'Add user request: ' + JSON.stringify(req.body) })

    try {
      const result = validate(req.body, userSchema)

      if (!result.valid) {
        logger.error({ label: 'USER CONTROLLER', message: result })
        res.status(400).send('Invalid request body')
        return
      }

      await _storage.insert('user', {
        email: req.body.email,
        rss: req.body.rss || []
      })

      res.status(200).end()
    } catch (e) {
      logger.error({ label: 'USER CONTROLLER', message: `Error adding email to storage: ${e}` })
      res.status(400).end()
    }
  }

  this.remove = async (req, res) => {
    logger.debug({ label: 'USER CONTROLLER', message: 'Remove user request: ' + JSON.stringify(req.body) })

    try {
      await _storage.remove('user', req.body)
      res.status(200).end()
    } catch (e) {
      logger.error({ label: 'USER CONTROLLER', message: `Error getting email from storage: ${e}` })
      res.status(400).end()
    }
  }

  this.find = async (req, res) => {
    logger.debug({ label: 'USER CONTROLLER', message: 'Find user: ' + req.query.email })

    try {
      if (!req.query.email) {
        logger.error({ label: 'USER CONTROLLER', message: 'Error empty email in query' })
        res.status(400).send()
        return
      }

      const user = await _storage.find('user', req.query.email)

      res.send(JSON.stringify({
        email: req.query.email, rss: user.rss
      }))
    } catch (e) {
      logger.error({ label: 'USER CONTROLLER', message: `Error getting email from storage: ${e}` })
      res.status(400).send()
    }
  }
}

module.exports = User