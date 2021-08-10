var Response = require('../config/Response')

const testModel = require('../model/Test')
const companyModel = require('../model/Company')
const participantModel = require('../model/Participant')

const create = async (req, res, next) => {
    var response = new Response()
    const { name, duration, sections } = req.body
    try {
        let test = await testModel.findOne({ name })
        if (test) {
            throw('A Test already exists with the same name.')
        } else {
            let data = new testModel({ name, duration, sections })
            data.save()
            response.message = 'Test has been created successfully.'
        }
    } catch (e) {
        response.status = 'FAILED'
        response.message = 'Unable to add Test.'
        response.error = e
    }
    res.statusMessage = response.message
    res.json(response)
}

const edit = async (req, res) => {
    let response = new Response()
    const { id, name, duration, sections } = req.body
    try {
        await testModel.findByIdAndUpdate(id, { name, duration, sections }, {useFindAndModify: false})
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
        response.data = await testModel.find()
    } catch (e) {
        response.data = []
        response.message = "Something went wrong."
        response.status = 'FAILED'
        response.error = e
    }
    res.json(response)
}

const testById = async (req, res) => {
    let response = new Response()
    try {
        response.data = await testModel.findById(req.params.test)
    } catch (e) {
        response.data = []
        response.message = "Something went wrong."
        response.status = 'FAILED'
        response.error = e
    }
    res.json(response)
}

const checkTest = async (req, res) => {
    let response = new Response()
    try {
        if(await testModel.findById(req.params.test) && await companyModel.findById(req.params.company)) {
            response.message = "SUCCESS" 
            response.data = { authentication: true }
        }
        else 
            throw("INVALID")
    } catch (e) {
        response.data = []
        response.message = "Something went wrong."
        response.status = 'FAILED'
        response.error = e
    }
    res.json(response)
}

const clientList = async (req, res) => {
    let response = new Response()
    try {
        const company = await companyModel.findOne({member: req.userId}).select('id')
        const tests = await testModel.find({status: true})
        let testList = []
        // for (let [key, item] of Object.entries(tests)) {
        for (const [key, item] of Object.entries(tests)) {
            let temp = JSON.parse(JSON.stringify(item))
            temp['participants'] = await participantModel.find({company: company.id, test: item._id}).countDocuments()
            testList.push(temp)
        }
        response.data = testList //await testModel.find({status: true})
    } catch (e) {
        response.data = []
        response.message = "Something went wrong."
        response.status = 'FAILED'
        response.error = e
    }
    res.json(response)
}

module.exports = {
    create, edit, list, checkTest, testById, clientList
}