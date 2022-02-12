const testRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blogpost')

testRouter.post('/reset', async (request, response) => {
    await User.deleteMany()
    await Blog.deleteMany()
    response.send(204).end()
})

module.exports = testRouter