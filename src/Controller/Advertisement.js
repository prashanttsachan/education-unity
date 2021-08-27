const Response = require('../Config/Response')

const adModel = require('../Model/Advertisement')

const create = async (req, res) => {
    var response = new Response()
    try {
        const { advertisement } = req.body
        const data = new adModel({ ...advertisement })
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
        await adModel.updateMany( query, update)
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
        response.data = await adModel.find(query)
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