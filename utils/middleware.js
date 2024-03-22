const jwt = require('jsonwebtoken')

const tokenExtractor = (req, res, next) => {
  const token = req.get('Authorization')
  if (token && token.startsWith('Bearer')) {
    req.token = token.replace('Bearer ', '')
  }
  next()
}

const userExtractor = (req, res, next) => {
  const token = req.get('Authorization')
  if (token && token.startsWith('Bearer')) {
    const decodedToken = jwt.decode(token.replace('Bearer ', ''), process.env.SECRET)
    req.user = decodedToken.username
    console.log('userExtractor ', req.user)
  }
  next()
}

const requestLogger = (req, res, next) => {
  console.log('Method:         ', req.method)
  console.log('URI:            ', req.url)
  console.log('status:         ', res.statusCode.toString())
  console.log('Payload:        ',
    !(Object.keys(req.body).length === 0)
      ? JSON.stringify(req.body)
      : null
  )
  console.log('----------------------------')
  console.log()
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  req.on(err => (console.log('errorHandler catching ', err)))
  next(err)
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  requestLogger,
  tokenExtractor,
  userExtractor
}