const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const port = 3001
const { Parser } = require('json2csv');


app.use(cors())

const Pool = require('pg').Pool
const e = require('express')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'parking',
  password: 'postgres',
  port: 5432,
})

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/spots', (req, res) => {
  pool.query('SELECT * FROM lot', (error, results) => {
    if (error) {
      return res.status(500).send(error)
    }
    return res.status(200).json(results.rows)
  })
})

app.get('/spots/export', (req, res) => {
  // This should be done using sql but.....
  pool.query('SELECT * FROM lot', (error, results) => {
    if (error) {
      return res.status(500).send(error)
    }
    data = {
      bigCount: 0,
      smallCount: 0,
      bigAvgTime: 0,
      smallAvgTime: 0
    }

    results.rows.forEach(e => {
      // do aggregation with logic
    })
    const fields = ['bigCount', 'smallCount', 'bigAvgTime', 'smallAvgTime'];
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(data);
    res.status(200).send(csv)
  })
})

app.get('/spots/:spotId', (req, res) => {
  const spotId = parseInt(req.params.spotId)
  pool.query('SELECT * FROM lot WHERE spotId = $1', [spotId], (error, results) => {
    if (error) {
      return res.status(500).send(error)
    }
    return res.status(200).json(results.rows)
  })
})

app.post('/spots', (req, res) => {
  const { spotId, car, size } = req.body
  pool.query('SELECT * FROM lot WHERE spotId = $1', [spotId], (error, results) => {
    if (error) {
      return res.status(500).send(error)
    }
    if (results.rows.length == 0) {
      const checkin = new Date()
      console.log(checkin)
      pool.query('INSERT INTO lot (spotId, car, size, checkin) VALUES ($1, $2, $3, $4)', [spotId, car, size, checkin], (error, results) => {
        if (error) {
          return res.status(500).send(error)
        }
        return res.status(201).send(`Lot spot added`)
      })
    } else {
      return res.status(500).send({ error: 'Car already exists in spot' })
    }
  })
})

app.put('/spots/:spotId', (req, res) => {
  const spotId = parseInt(req.params.spotId)
  const { checkout } = req.body
  console.log(checkout)
  pool.query(
    'UPDATE lot SET checkout = $1 WHERE spotId = $2',
    [checkout, spotId],
    (error, results) => {
      if (error) {
        return res.status(500).send(error)
      }
      return res.status(200).send(`Lot spot modified with ID: ${spotId}`)
    }
  )
})

app.delete('/spots/:spotId', (req, res) => {
  const spotId = parseInt(req.params.spotId)

  pool.query('DELETE FROM lot WHERE spotId = $1', [spotId], (error, results) => {
    if (error) {
      return res.status(500).send(error)
    }
    return res.status(200).send(`Lot spot deleted with ID: ${spotId}`)
  })
})

server = app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

module.exports = server