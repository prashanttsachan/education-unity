var Response = require('../config/Response')

const ticketModel = require('../model/Ticket')


const create = async (req, res, next) => {
    var response = new Response()
    const { subject, message } = req.body
    try {
        let data = new ticketModel({ subject, member: req.userId, message })
        data.save()
        response.message = 'Ticket has been submitted successfully.'
    } catch (e) {
        response.status = 'FAILED'
        response.message = 'Unable to add category.'
        response.error = e
    }
    res.statusMessage = response.message
    res.json(response)
}

const edit = async (req, res) => {
    let response = new Response()
    const { id, status, remarks } = req.body
    try {
        await ticketModel.findByIdAndUpdate(id, {status, remarks}, {useFindAndModify: false})
        response.message = "Processed successfully."
    } catch (e) {
        response.message = "Something went wrong."
        response.status = 'FAILED'
        response.error = e
    }
    res.json(response)
}

const findById = async (req, res) => {
    let response = new Response()
    try {
        response.data = await ticketModel.findById(req.params.id)
    } catch (e) {
        response.message = "Something went wrong."
        response.status = 'FAILED'
        response.error = e
    }
    res.json(response)
}

const list = async (req, res) => {
    let response = new Response()
    try {
        response.data = await ticketModel.find().populate('member', 'firstname lastname email mobile id')
    } catch (e) {
        response.message = "Something went wrong."
        response.status = 'FAILED'
        response.error = e
    }
    res.json(response)
}

const clientList = async (req, res) => {
    let response = new Response()
    try {
        response.data = await ticketModel.find({member: req.userId}).populate('member', 'firstname lastname email mobile id')
    } catch (e) {
        response.message = "Something went wrong."
        response.status = 'FAILED'
        response.error = e
    }
    res.json(response)
}

module.exports = {
    create, edit, list, findById, clientList
}