const mjml2html = require('mjml')

function MailBuilder () {
  if (!(this instanceof MailBuilder)) {
    return new MailBuilder()
  }

  const buildHeader = (feed) => {
    return `<mj-text font-weight="bold" font-size="18px">
                ${feed.title}
            </mj-text>
            <mj-text font-size="14px">
                ${feed.description}
            </mj-text>`
  }

  const buildItem = (item) => {
    return `<mj-text font-weight="bold" font-size="14px">
                ${item.title}
            </mj-text>
            <mj-text font-style="italic" font-size="12px">
                Published by ${item.author} on ${item.pubDate}
            </mj-text>
            <mj-text font-size="14px">
                ${item.contentSnippet || 'No description.'}
            </mj-text>
            <mj-text font-size="14px">
                <a href="${item.link}">Read more</a>
            </mj-text>`
  }

  this.build = (feeds) => {
    let mail = '<mj-section><mj-column>'

    feeds.forEach(feed => {
      mail += buildHeader(feed)
      feed.items.forEach((item) => {
        mail += buildItem(item)
      })
      mail += '</mj-column></mj-section>'
    })

    return mjml2html(`<mjml><mj-body>${mail}</mj-body></mjml>`)
  }
}

module.exports = MailBuilder