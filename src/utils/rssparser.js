const Parser = require('rss-parser')
const logger = require('./logger')

function RssParser () {
  if (!(this instanceof RssParser)) {
    return new RssParser()
  }

  const _parser = new Parser()

  this.parse = async (feeds) => {
    const promises = feeds.map(async url => {
      try {
        return _parser.parseURL(url)
      } catch (e) {
        logger.error({ label: 'RSS PARSER', message: e })
      }
    })

    return Promise.all(promises)
  }
}

module.exports = RssParser