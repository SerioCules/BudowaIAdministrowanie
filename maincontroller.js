const logger = require('../utils/logger')

function MailController (storage, parser, mail, sender) {
  if (!(this instanceof MailController)) {
    return new MailController(storage, parser, mail, sender)
  }

  const _storage = storage
  const _parser = parser
  const _mail = mail
  const _sender = sender

  const prepare = async (email) => {
    try {
      const user = await _storage.find('user', email)
      const feeds = await _parser.parse(user.rss)

      return _mail.build(feeds)
    } catch (e) {
      logger.error({ label: 'MAIL CONTROLLER', message: e })
      throw new Error('Failed to build mail')
    }
  }

  this.sendPreview = async (req, res) => {
    logger.info({ label: 'MAIL CONTROLLER', message: 'Get preview to: ' + JSON.stringify(req.query.email) })

    if (!req.query.email) {
      logger.error({ label: 'MAIL CONTROLLER', message: 'Empty email' })
      res.status(400).send('empty email')
      return
    }

    try {
      const content = await prepare(req.query.email)

      res.set('Content-Type', 'text/html')
      res.send(content.html)
    } catch (e) {
      logger.error({ label: 'MAIL CONTROLLER', message: e })
      res.status(400).end()
    }
  }

  this.sendMail = async (req, res) => {
    logger.info({ label: 'MAIL CONTROLLER', message: 'Send mail to: ' + JSON.stringify(req.query.email) })

    if (!req.query.email) {
      logger.error({ label: 'MAIL CONTROLLER', message: 'Empty email' })
      res.status(400).send('empty email')
      return
    }

    try {
      const content = await prepare(req.query.email)
      await _sender.sendMail(req.query.email, content.html)

      res.status(200).end()
    } catch (e) {
      logger.error({ label: 'MAIL CONTROLLER', message: e })
      res.status(400).send(e)
    }
  }
}

module.exports = MailController