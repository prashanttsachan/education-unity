var Response = require('../config/Response')

const sectionModel = require('../model/Section')


const create = async (req, res, next) => {
    var response = new Response()
    const { name } = req.body
    try {
        let category = await sectionModel.findOne({ name })
        if (category) {
            throw('A Section already exists with the same name.')
        } else {
            let data = new sectionModel({ name })
            data.save()
            response.message = 'Section has been added successfully.'
        }
    } catch (e) {
        response.status = 'FAILED'
        response.message = 'Unable to add section.'
        response.error = e
    }
    res.statusMessage = response.message
    res.json(response)
}

const edit = async (req, res) => {
    let response = new Response()
    const { id, name } = req.body
    try {
        await sectionModel.findByIdAndUpdate(id, {name}, {useFindAndModify: false})
        response.message = "Updated successfully."
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
        response.data = await sectionModel.find()
    } catch (e) {
        response.message = "Something went wrong."
        response.status = 'FAILED'
        response.error = e
    }
    res.json(response)
}

module.exports = {
    create, edit, list
}