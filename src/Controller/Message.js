const Response = require('../Config/Response')

const msgModel = require('../Model/Message')

const create = async (req, res) => {
    var response = new Response()
    try {
        const { message } = req.body
        const data = new msgModel({ ...message })
        await data.save()
        response.message = "Sent"
    } catch (e) {
        response.message = "Something went wrong."
        res.error = e
    }
    res.statusMessage = response.message
    res.json(response)
}

const update = async ( req, res ) => {
    var response = new Response()
    try {
        const { update, query } = req.body
        await msgModel.updateMany( query, update)
        response.message = "Data updated successfully."
    } catch (e) {
        response.message = "Something went wrong."
        res.error = e
    }
    res.statusMessage = response.message
    res.json(response)
}

const list = async ( req, res ) => {
    var response = new Response()
    try {
        const { query } = req.body
        response.data = await msgModel.find(query)
    } catch (e) {
        response.message = "Something went wrong."
        res.error = e
    }
    res.statusMessage = response.message
    res.json(response)
}

module.exports = {
    create, update, list
}