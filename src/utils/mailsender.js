const Mailgun = require('mailgun-js')

function MailSender (config) {
  if (!new.target) {
    return new MailSender(config)
  }

  _mailgun = new Mailgun({
    apiKey: config.apiKey,
    domain: config.domain
  })

  this.send = async (to, content) => {
    return _mailgun.messages()
      .send({
        from: 'team@feedmail.com',
        to: to,
        subject: 'Feedmail RSS',
        text: 'News from your favorite rss',
        html: content,
    })
  }
}

module.exports = MailSender