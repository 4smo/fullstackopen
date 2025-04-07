const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('dist'))

let persons = [
    {
      id: "1",
      name: "Arto Hellas",
      number: "040-0234234"
    },
    {
      id: "2",
      name: "Ada Lovelance",
      number: "040-1234444"
    },
    {
      id: "3",
      name: "Dan Abramob",
      number: "040-34344334"
    },
    {
      id: "4",
      name: "Mary Poppins",
      number: "040-12342144"
    }
  ]

app.get('/', (request, response) => {
    response.json(persons)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const peopleCount = persons.length
  const now = new Date();
  response.send(`
    <p>Phonebook has info for ${peopleCount} people</p>
    <p>${now}</p>
    `);
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => Number(n.id)))
      : 0
    return String(maxId + 1)
}
  
app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'name or number missing' 
      })
    }
    
    const nameExists = persons.some(person => person.name === body.name)
    if (nameExists) {
      return response.status(400).json({
        error: 'name must be unique'
      })
    }

    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})