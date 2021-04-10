/* eslint-disable quote-props */

module.exports = {
    'type': 'object',
    'required': ['email', 'rss'],
    'properties': {
      'email': { 'type': 'string' },
      'rss': {
        'type': 'array',
        'items': { 'type': 'string' }
      }
    }
  }