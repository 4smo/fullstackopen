require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
const Person = require('./models/person')

app.get('/', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons);
    })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    const peopleCount = persons.length;
    const now = new Date();
    response.send(`
      <p>Phonebook has info for ${peopleCount} people</p>
      <p>${now}</p>
    `);
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
  })
  .catch(error => next(error))
  })

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id).then(result => {
    if (result) {
        response.status(204).end()
    } else {
        response.status(404).end()
    }
  })
  .catch(error => next(error))
})
  
app.post('/api/persons', (request, response, next) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({ 
            error: 'name or number missing' 
        })
    }
    const person = new Person({
        name: body.name,
        number: body.number,
    })
    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const { number } = request.body
  Person.findOneAndUpdate({_id: id}, { number }, {new: true}).then(result => {
    if (result) {
      response.json(result)
  } else {
      response.status(404).end()
    }
  })
.catch(error => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}

app.use(errorHandler)