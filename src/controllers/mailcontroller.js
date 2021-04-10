const logger = require('../utils/logger')

function MailController(storage, parser, mail, sender) {
  if (!new.target) {
    return new MailController(storage, parser, mail, sender)
  }

  const _storage = storage
  const _parser = parser
  const _mail = mail
  const _sender = sender

  this.build = async (email) => {
    logger.debug({ label: 'MAIL CONTROLLER', message: 'Build mail for: ' + email })

    if (!email) {
      throw new Error('empty email')
    }

    const user = await _storage.find('user', email)
    const feeds = await _parser.parse(user.rss)

    return _mail.build(feeds)
  }

  this.send = async (email, content) => {
      logger.debug({ label: 'MAIL CONTROLLER', message: 'Send mail to: ' + email })

      if (!email) {
        throw new Error('empty email')
      }
  
      await _sender.send(email, content)
  }
}

module.exports = MailController