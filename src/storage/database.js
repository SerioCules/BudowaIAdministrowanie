const MongoClient = require('mongodb').MongoClient
const logger = require('../utils/logger')

function Database () {
  if (!new.target) {
    return new Database()
  }

  let _db = null
  let _client = null

  this.connect = async (config) => {
    try {
      _client = await MongoClient.connect(config.url, config.options)
      _db = _client.db(config.name)

      if (!_db) {
        logger.error({ label: 'DATABASE', message: "can't establish mongo connection reason: null client" })
        return;
      }

      logger.info({ label: 'DATABASE', message: 'successful establish DB connection' })

    } catch (e) {
      logger.error({ label: 'DATABASE', message: e.message })
    }
  }

  this.insert = async (name, content) => {
    const collection = _db.collection(name)
    return collection.updateOne({ email: content.email }, { $set: { rss: content.rss } }, { upsert: true })
  }

  this.find = async (name, item) => {
    const collection = _db.collection(name)
    return collection.findOne({}, { email: item })
  }

  this.update = async (name, oldContent, newContent) => {
    const collection = _db.collection(name)
    return collection.updateOne(oldContent, newContent)
  }

  this.remove = async (name, content) => {
    const collection = _db.collection(name)
    return collection.deleteOne(content)
  }

  this.drop = async (name) => {
    const collection = _db.collection(name)
    return collection.drop()
  }

  process.on('SIGTERM', () => {
    _db.close()
  })
}

module.exports = Database