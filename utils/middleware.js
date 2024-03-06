const requestLogger = (req, res, next) => {

  console.dir(res)
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

module.exports = { unknownEndpoint, errorHandler, requestLogger }