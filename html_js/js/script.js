// eslint-disable-next-line no-unused-vars
function saveChanges () {
    const email = document.getElementById('input_email').value
    const rss = []
  
    document.getElementById('list_rss').childNodes.forEach(elem => {
      if (!elem.id) {
        return
      }
      rss.push(elem.id)
    })
  
    const content = {
      email: email,
      rss: rss
    }
  
    fetch('/v1/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(content)
    })
      .then((res) => {
        if (res.status !== 200) {
          alert('Failed to save data')
          return
        }
        alert('Data was saved')
      })
      .catch((error) => {
        alert('Request failed. ' + JSON.stringify(error))
      })
  }
  
  function addRss (rss) {
    if (!rss) {
      return
    }
  
    const ul = document.getElementById('list_rss')
  
    const li = document.createElement('li')
    li.setAttribute('id', rss)
    li.setAttribute('class', 'list-group-item')
  
    const a = document.createElement('a')
    a.setAttribute('class', 'fa fa-trash-o mr-2 fa-1.5x')
    a.setAttribute('onclick', "deleteRss('" + rss + "')")
  
    li.appendChild(a)
    li.appendChild(document.createTextNode(rss))
    ul.appendChild(li)
  }
  
  // eslint-disable-next-line no-unused-vars
  function addRssFromInput () {
    addRss(document.getElementById('input_rss').value)
    document.getElementById('input_rss').value = ''
  }
  
  // eslint-disable-next-line no-unused-vars
  function deleteRss (id) {
    const ul = document.getElementById('list_rss')
    const li = document.getElementById(id)
  
    ul.removeChild(li)
  }
  
  // eslint-disable-next-line no-unused-vars
  function sendMail () {
    const email = document.getElementById('input_email').value
  
    fetch(`/v1/mail?email=${email}`, {
      method: 'POST'
    })
      .then(res => {
        return res.text()
      })
      .catch((error) => {
        alert('Request failed.' + JSON.stringify(error))
      })
  }
  
  // eslint-disable-next-line no-unused-vars
  function getPreview () {
    const email = document.getElementById('input_email').value
  
    fetch(`/v1/mail?email=${email}`, {
      method: 'GET'
    })
      .then(res => {
        return res.text()
      })
      .then(data => {
        var doc = document.getElementById('iframe_mail').contentWindow.document
        doc.open()
        doc.write(data)
        doc.close()
      })
      .catch((error) => {
        alert('Request failed.' + JSON.stringify(error))
      })
  }
  
  function getData () {
    fetch(`/v1/user`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        document.getElementById('input_email').value = data.email
        data.rss.forEach((rss) => {
          addRss(rss)
        })
      })
      .catch((error) => {
        alert('Request failed. ' + JSON.stringify(error))
      })
  }
  
  window.onload = getData()