const sgMail = require('@sendgrid/mail')

function Sender () {
  if (!(this instanceof Sender)) {
    return new Sender()
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  this.sendMail = async (to, content) => {
    if (process.env.development) {
      throw new Error('Development mode mail will not be send')
    }

    await sgMail.send({
      from: 'team@feedmail.com',
      to: to,
      subject: 'Feedmail RSS',
      text: 'News from your favorite rss',
      html: content
    })
  }
}

module.exports = Sender