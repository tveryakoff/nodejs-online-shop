const http = require('http')

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === '/') {
    res.write(`
      <html>
      <head><title>create user</title></head>
      <body>
      <h1>Welcome!</h1>
      <h2>Create new user here</h2>
      <form action="/createUser" method="POST">
      <input name="userName" type="text">
      <button type="submit">Submit</button>
</form>
</body>
</html>
    `)
    return res.end()
  }
  if (req.method === 'GET' && req.url === '/users') {
    res.write(`
      <html>
      <head><title>create user</title></head>
      <body>
      <h1>Welcome!</h1>
      <h2>User list</h2>
      <ul>
      <li>Dima</li>
      <li>Sanya</li>
      <li>Mark</li>
</ul>
</form>
</body>
</html>
    `)
    return res.end()
  }

  if (req.method === 'POST' && req.url === '/createUser') {
    const dataList = []
    req.on('data', (chunk) => {
      dataList.push(chunk)
    })
    req.on('end', () => {
      const stringData = Buffer.concat(dataList).toString()
      console.log('newUser', stringData)
      res.statusCode = 302
      res.setHeader('Location', '/')
      res.end()
    })
  }
 })

server.listen(3000)
