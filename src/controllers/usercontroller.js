const validate = require('jsonschema').validate
const userSchema = require('../schema/userSchema')
const logger = require('../utils/logger')

function UserController (storage) {
  if (!new.target) {
    return new UserController(storage)
  }

  const _storage = storage

  this.add = async (data) => {
      logger.debug({ label: 'USER CONTROLLER', message: 'Add user request: ' + JSON.stringify(data) })

      const result = validate(data, userSchema)

      if (!result.valid) {
        logger.error({ label: 'USER CONTROLLER', message: result })
        throw new Error('invalid request body')
      }

      storage.insert('user', { email: data.email, rss: data.rss || [] })
  }

  this.remove = async (data) => {
      logger.debug({ label: 'USER CONTROLLER', message: 'Remove user request: ' + JSON.stringify(data) })
  
      return _storage.remove('user', data)
  }

  this.find = async (email) => {
      logger.debug({ label: 'USER CONTROLLER', message: 'Find user: ' + email })

      return _storage.find('user', email)
  }
}

module.exports = UserController