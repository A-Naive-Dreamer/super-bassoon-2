const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    {
        PORT,
        db,
        JWT_SECRET_KEY
    } = require('./config'),
    cors = require('cors'),
    jwt = require('express-jwt')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(
    jwt({ secret: JWT_SECRET_KEY }).unless({
        path: [
            {
                url: '/',
                method: ['GET']
            },
            {
                url: '/users/log-in',
                method: ['POST']
            },
            {
                url: '/users/sign-up',
                method: ['POST']
            }
        ]
    })
)
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            message: 'You are not allowed to enter this endpoints.'
        })
    }

    return next()
})

app.use('/', require('./routes'))
app.use('/todos', require('./routes/todos'))
app.use('/users', require('./routes/users'))

if (db) {
    app.listen(PORT, () => {
        console.log(`This app listening on port: ${PORT || 5000}`)
    })
}