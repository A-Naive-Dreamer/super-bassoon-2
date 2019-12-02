const { Todos } = require('../../models')

module.exports = {
    getAll: async (req, res) => {
        try {
            await Todos
                .find({})
                .then(result => {
                    res.status(200).send({
                        message: 'Get all datas.',
                        data: result
                    })
                })
        } catch (error) {
            console.log(error)
        }
    },
    getById: async (req, res) => {
        try {
            await Todos
                .find({
                    userId: parseInt(req.params.userId)
                })
                .then(result => {
                    res.status(200).send({
                        message: 'Get data by id.',
                        data: result
                    })
                })
        } catch (error) {
            console.log(error)
        }
    },
    getCompleted: async (req, res) => {
        try {
            await Todos
                .find({
                    userId: parseInt(req.params.userId),
                    status: 'completed'
                })
                .then(result => {
                    res.status(200).send({
                        message: 'Get completed data.',
                        data: result
                    })
                })
        } catch (error) {
            console.log(error)
        }
    },
    getUncompleted: async (req, res) => {
        try {
            await Todos
                .find({
                    userId: parseInt(req.params.userId),
                    status: 'uncompleted'
                })
                .then(result => {
                    res.status(200).send({
                        message: 'Get uncompleted data.',
                        data: result
                    })
                })
        } catch (error) {
            console.log(error)
        }
    },
    deleteOne: async (req, res) => {
        try {
            await Todos
                .updateOne(
                    {
                        id: parseInt(req.params.id),
                        userId: parseInt(req.params.userId)
                    },
                    {
                        $set: {
                            status: 'deleted'
                        }
                    }
                )
                .then(result => {
                    try {
                        Todos
                            .find({
                                userId: parseInt(req.params.userId),
                            })
                            .then(result2 => {
                                res.send({
                                    message: 'Data is successfully updated.',
                                    data: result2
                                })
                            })
                    } catch (error) {
                        console.log(error)
                    }
                })
        } catch (error) {
            console.log(error)
        }
    },
    addOne: async (req, res) => {
        try {
            await Todos
                .find({})
                .then(result1 => {
                    try {
                        Todos
                            .insertMany({
                                id: parseInt(result1.length) + 1,
                                userId: parseInt(req.params.userId),
                                status: 'uncompleted',
                                todos: req.body.todos
                            })
                            .then(result2 => {
                                try {
                                    Todos
                                        .find({
                                            userId: parseInt(req.params.userId)
                                        })
                                        .then(result3 => {
                                            res.send({
                                                message: 'Data is successfully added.',
                                                data: result3
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
            await Todos.updateOne(
                {
                    userId: parseInt(req.params.userId),
                    id: parseInt(req.params.id)
                },
                {
                    $set: {
                        todos: req.body.todos
                    }
                }
            )
                .then(result => {
                    try {
                        Todos
                            .find({
                                userId: parseInt(req.params.userId)
                            })
                            .then(result2 => {
                                res.send({
                                    message: 'Data is successfully updated.',
                                    data: result2
                                })
                            })
                    } catch (error) {
                        console.log(error)
                    }
                })
        } catch (error) {
            console.log(error)
        }
    },
    setAsCompleted: async (req, res) => {
        try {
            await Todos
                .updateOne(
                    {
                        id: parseInt(req.params.id),
                        userId: parseInt(req.params.userId)
                    },
                    {
                        $set: {
                            status: 'completed'
                        }
                    }
                )
                .then(result => {
                    try {
                        Todos
                            .find({
                                userId: parseInt(req.params.userId)
                            })
                            .then(result2 => {
                                res.send({
                                    message: 'Data is successfully updated.',
                                    data: result2
                                })
                            })
                    } catch (error) {
                        console.log(error)
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }
}