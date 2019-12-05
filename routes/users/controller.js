const { Users } = require('../../models'),
    {
        comparePassword,
        hashPassword
    } = require('../../helpers'),
    { JWT_SECRET_KEY } = require('../../config'),
    jwt = require('jsonwebtoken')

module.exports = {
    getAll: async (req, res) => {
        try {
            await Users
                .find({})
                .then(result => {
                    res.status(200).send({
                        message: 'Get all users.',
                        data: result
                    })
                })
        } catch (error) {
            console.log(error)
        }
    },
    login: async (req, res) => {
        try {
            await Users
                .find({
                    email: req.body.email
                })
                .then(async result => {
                    if (result.length > 0) {
                        let firstName = result[0].firstName,
                            lastName = result[0].lastName,
                            password = result[0].password,
                            id = result[0].id

                        const decision = await comparePassword(req.body.password, password)

                        if (decision) {
                            const token = await jwt.sign(
                                {
                                    id,
                                    firstName,
                                    lastName
                                },
                                JWT_SECRET_KEY,
                                {
                                    expiresIn: '1d'
                                }
                            )

                            res.send({
                                token
                            })
                        } else {
                            res.send({
                                message: 'Email or password is wrong!'
                            })
                        }
                    } else {
                        res.send({
                            message: 'Email or password is wrong!'
                        })
                    }
                })
        } catch (error) {
            console.log(error)
        }
    },
    getById: async (req, res) => {
        try {
            await Users
                .find({
                    id: parseInt(req.params.id)
                })
                .then(result => {
                    res.send({
                        message: 'Get user by id.',
                        data: result
                    })
                })
        } catch (error) {
            console.log(error)
        }
    },
    deleteOne: async (req, res) => {
        try {
            await Users
                .deleteOne(
                    {
                        id: parseInt(req.params.id)
                    }
                )
                .then(result => {
                    res.send({
                        message: 'User is successfully deleted.',
                        data: result
                    })
                })
        } catch (error) {
            console.log(error)
        }
    },
    signUp: async (req, res) => {
        try {
            await Users
                .find({
                    email: req.body.email
                })
                .then(async result1 => {
                    if (result1.length > 0) {
                        res.send({
                            message: 'Email have been used!'
                        })

                        return null
                    }

                    try {
                        let password = await hashPassword(req.body.password)

                        Users
                            .find({})
                            .then(result2 => {
                                try {
                                    Users
                                        .insertMany({
                                            id: parseInt(result2.length) + 1,
                                            firstName: req.body.firstName,
                                            lastName: req.body.lastName,
                                            email: req.body.email,
                                            password: password
                                        })
                                        .then(result3 => {
                                            res.send({
                                                message: 'User is successfully added.'
                                            })
                                        })
                                } catch (error) {
                                    console.log(error)
                                }
                            })
                    } catch (error) {
                        console.log(error)
                    }
                })
        } catch (error) {
            console.log(error)
        }
    },
    updateOne: async (req, res) => {
        try {
            await Users
                .updateOne(
                    {
                        id: parseInt(req.params.id)
                    },
                    {
                        $set: {
                            id: parseInt(req.params.id),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: req.body.password
                        }
                    }
                )
                .then(result => {
                    res.send({
                        message: 'User is successfully updated.',
                        data: result
                    })
                })
        } catch (error) {
            console.log(error)
        }
    }
}