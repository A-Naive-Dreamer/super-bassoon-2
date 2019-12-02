const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    {
        PORT,
        db
    } = require('./config'),
    cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', require('./routes'))
app.use('/todos', require('./routes/todos'))
app.use('/users', require('./routes/users'))

if (db) {
    app.listen(PORT, () => {
        console.log(`This app listening on port: ${PORT || 5000}`)
    })
}