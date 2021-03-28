/* eslint-disable no-undef */
const MailController = require('../../src/controllers/mailcontroller')
const Database = require('../../src/storage/database')
const RssParser = require('../../src/utils/rssparser')
const MailBuilder = require('../../src/utils/mailbuilder')
const Sender = require('../../src/utils/sender')

jest.mock('express')
jest.mock('../../src/storage/database')
jest.mock('../../src/utils/rssparser')
jest.mock('../../src/utils/mailbuilder')
jest.mock('../../src/utils/sender')

describe('MailController', () => {
  const email = 'test@email.com'
  const rsses = ['test.rss.xml']
  const content = '<html><body>test mail</>body</html>'

  it('sends mail', async () => {
    const req = require('express').request
    req.query = { email }

    const res = require('express').response
    res.status = jest.fn().mockImplementation((_) => res)
    res.send = jest.fn().mockImplementation((_) => res)

    const db = new Database()
    db.find = jest.fn().mockImplementation(() => {
      return { email, rsses }
    })

    const rss = new RssParser()
    rss.parse = jest.fn().mockImplementation(() => {
      return [{
        title: 'test',
        description: 'test'
      }]
    })

    const mailBuilder = new MailBuilder()
    mailBuilder.build = jest.fn().mockImplementation(() => {
      return { html: content }
    })

    const sender = new Sender()
    sender.sendMail = jest.fn().mockImplementation(() => {})

    const controller = new MailController(db, rss, mailBuilder, sender)
    await controller.sendMail(req, res)

    expect(sender.sendMail).toHaveBeenCalledWith(email, content)
    expect(res.status).toHaveBeenCalledWith(200)
  })

  it('sends preview', async () => {
    const req = require('express').request
    req.query = { email }

    const res = require('express').response
    res.status = jest.fn().mockImplementation((_) => res)
    res.send = jest.fn().mockImplementation((_) => res)
    res.set = jest.fn()

    const db = new Database()
    db.find = jest.fn().mockImplementation(() => {
      return { email, rss }
    })

    const rss = new RssParser()
    rss.parse = jest.fn().mockImplementation(() => {
      return [{
        title: 'test',
        description: 'test'
      }]
    })

    const mailBuilder = new MailBuilder()
    mailBuilder.build = jest.fn().mockImplementation(() => {
      return { html: content }
    })

    const sender = new Sender()
    sender.sendMail = jest.fn().mockImplementation(() => {})

    const controller = new MailController(db, rss, mailBuilder, sender)
    await controller.sendPreview(req, res)

    expect(res.set).toHaveBeenCalledWith('Content-Type', 'text/html')
    expect(res.send).toHaveBeenCalledWith(content)
  })
})