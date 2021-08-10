const Response = require('../Config/Response')

const donationModel = require('../Model/Donation')

const create = async (req, res) => {
    var response = new Response()
    try {
        const { donation } = req.body
        const data = new donationModel({ ...donation })
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
        await donationModel.updateMany( query, update)
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
        response.data = await donationModel.find(query)
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