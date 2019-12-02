const { Users } = require('../../models')

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
                .then(result => {
                    if (result.length > 0) {
                        let item = result.find(item => {
                            return item.password === req.body.password
                        })

                        if (item != null) {
                            res.send({
                                id: item.id,
                                firstName: item.firstName,
                                lastName: item.lastName
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
                .then(result1 => {
                    if (result1.length > 0) {
                        res.send({
                            message: 'Email have been used!'
                        })

                        return null
                    }

                    try {
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
                                            password: req.body.password
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