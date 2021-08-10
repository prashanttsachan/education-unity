const Response = require('../Config/Response')

const ansModel = require('../Model/Answer')

const create = async (req, res) => {
    var response = new Response()
    try {
        const { answer } = req.body
        const data = new ansModel({ ...answer })
        await data.save()
        response.message = "Saved successfully."
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
        await ansModel.updateMany( query, update)
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
        response.data = await ansModel.find(query)
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