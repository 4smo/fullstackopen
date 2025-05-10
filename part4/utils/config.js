require('dotenv').config()

const mongoUrl = process.env.MONGODB_URI
const port = process.env.PORT
const secret = process.env.SECRET

module.exports = { mongoUrl, port, secret }