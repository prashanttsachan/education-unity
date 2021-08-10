var Response = require('../config/Response')

const questionModel = require('../model/Question')


const questionWritten = async (req, res) => {
    var response = new Response()
    try {
        const {section, type, question, marks } = req.body
        let data = new questionModel({section, questionType: type, question, marks})
        data.save()
        response.message = 'Saved successfully.'
    } catch (e) {
        response.status = 'FAILED'
        response.message = 'Unable to add question.'
    }
    res.statusMessage = response.message
    res.json(response)
}

const questionWrittenEdit = async (req, res) => {
    var response = new Response()
    try {
        const {section, question, marks, id } = req.body
        await questionModel.findByIdAndUpdate(id, {section, question, marks}, {useFindAndModify: false})
        response.message = 'Updated successfully.'
    } catch (e) {
        response.status = 'FAILED'
        response.message = 'Unable to update question.'
    }
    res.statusMessage = response.message
    res.json(response)
}

const questionMCQ = async (req, res) => {
    var response = new Response()
    try {
        const {section, question, marks, answers, correctAnswer} = req.body
        let data = new questionModel({correctAnswer, section, questionType: "MCQ", question, answers, marks})
        data.save()
        response.message = 'Saved successfully.'
    } catch (e) {
        response.status = 'FAILED'
        response.message = 'Unable to add question.'
    }
    res.statusMessage = response.message
    res.json(response)
}

const questionMCQEdit = async (req, res) => {
    var response = new Response()
    try {
        const {section, question, marks, answers, correctAnswer, id} = req.body
        await questionModel.findByIdAndUpdate(id, {correctAnswer, section, question, answers, marks}, {useFindAndModify: false})
        response.message = 'Updated successfully.'
    } catch (e) {
        response.status = 'FAILED'
        response.message = 'Unable to update question.'
    }
    res.statusMessage = response.message
    res.json(response)
}

const questionImage = async (req, res) => {
    var response = new Response()
    try {
        const {section, type, question, marks, correctAnswer } = req.body
        const answers = [
            { answer: req.files.optionAImage[0].filename}, 
            { answer: req.files.optionBImage[0].filename},
            { answer: req.files.optionCImage[0].filename},
            { answer: req.files.optionDImage[0].filename},
        ]
        let data = new questionModel({section, correctAnswer, questionType: type, questionImage: req.files.questionImage[0].filename, question, answers, marks})
        data.save()
        response.message = 'Saved successfully.'
    } catch (e) {
        response.status = 'FAILED'
        response.message = 'Unable to add question.'
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
        response.data = await questionModel.find().populate('section', 'id name')
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
        response.data = await questionModel.findById(req.params.id).populate('section', 'id name')
    } catch (e) {
        response.message = "Something went wrong."
        response.status = 'FAILED'
        response.error = e
    }
    res.json(response)
}

module.exports = {
    findById, questionWritten, questionWrittenEdit, questionMCQ, questionMCQEdit, questionImage, edit, list
}