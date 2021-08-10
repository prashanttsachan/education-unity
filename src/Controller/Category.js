var Response = require('../config/Response')

const categoryModel = require('../model/Category')


const create = async (req, res, next) => {
    var response = new Response()
    const { name } = req.body
    try {
        let category = await categoryModel.findOne({ name })
        if (category) {
            throw('A category already exists with the same name.')
        } else {
            let data = new categoryModel({ name })
            data.save()
            response.message = 'Category has been added successfully.'
        }
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
    const { id, name } = req.body
    try {
        await categoryModel.findByIdAndUpdate(id, {name}, {useFindAndModify: false})
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
        response.data = await categoryModel.find()
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