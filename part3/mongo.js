const mongoose = require('mongoose')

const password = process.argv[2]
const names = process.argv[3]
const number = process.argv[4]
const url = `mongodb+srv://4smo:${password}@cluster0.ms3fgqv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  names: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('Phonebook:')
    result.forEach(person => {
      console.log(`${person.names} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length > 4) {
  const person = new Person({
    names: names,
    number: number,
  })
  person.save().then(result => {
    console.log(`added ${names} ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('Please provide password, names and number')
  mongoose.connection.close()
}