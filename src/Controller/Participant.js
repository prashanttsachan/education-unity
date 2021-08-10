var Response = require('../config/Response')

const participantModel = require('../model/Participant')
const testModel = require('../model/Test')
const companyModel = require('../model/Company')
const questionModel = require('../model/Question')
const answerModel = require('../model/Answer')

const create = async (req, res, next) => {
    var response = new Response()
    const { test, company, name, email, mobile, gender, dob, ip } = req.body
    try {
        const selectedTest = await testModel.findById(test) 
        const selectedCompany = await companyModel.findById(company)
        if (!selectedTest || !selectedCompany)
            throw("Test link does not exists.")
        const participant = await participantModel.findOne({$or:[{email},{mobile}], test, company}).sort({_id: -1})
        if (participant && participant.status !== 'ALLOW')
            throw("This email/mobile already used for this test.")
        let sectionData = []
        for (const [key, item] of Object.entries(selectedTest.sections)) {//let (id, item) in ) {
            let result = await questionModel.aggregate([
                { $match: { section: item._id }},
                { $sample: { size: item.questions }}
            ])
            let temp = {
                _id: item._id,
                name: item.name,
                question: result,
                total: item.marks
            }
            sectionData.push(temp)
        }
        let data = new participantModel({ 
            test, company, name, email, mobile, gender, dob, ip, section: sectionData
        })
        data = await data.save()
        await companyModel.findByIdAndUpdate(company, {$inc: { balance: -selectedTest.price}}, {useFindAndModify: false})
        response.data = {
            user: data,
            section: sectionData
        }
        response.message = 'SUCCESS'
    } catch (e) {
        console.log(e)
        response.status = 'FAILED'
        response.message = e
        response.error = 'Unable to proceed further.'
    }
    res.statusMessage = response.message
    res.json(response)
}

const startTest = async (req, res) => {
    let response = new Response()
    participant = req.params.participant
    try {
        const sections = await participantModel.findById(participant).populate('section.question').select('section -_id')
        response.data = sections.section
    } catch (e) {
        response.message = 'ERROR'
    }
    res.json(response)
}

const submitAnswer = async (req, res) => {
    let response = new Response()
    const { id, question, answer } = req.body
    try {
        let result = await answerModel.findOne({participant: id, question})
        if (result) {
            await answerModel.updateOne({participant: id, question}, { answer })
        } else {
            const data = new answerModel({participant: id, question, answer})
            await data.save()
        }
        response.message = "SUBMITTED"
    } catch (e) {
        response.message = e
        response.status = 'FAILED'
        response.error = e
    }
    res.json(response)
}

const listByTest = async (req, res) => {
    let response = new Response()
    try {
        response.data = await participantModel.find(req.body.fq).sort({_id: -1})
    } catch (e) {
        response.message = "Something went wrong."
        response.status = 'FAILED'
        response.error = e
    }
    res.json(response)
}

const getQuestions = async (req, res) => {
    let response = new Response()
    try {
        const result = await participantModel.findById( req.params.id).select('questions -_id')
        response.data = await questionModel.find({_id: {$in: result.questions}})
    } catch (e) {
        response.message = "Something went wrong."
        response.status = 'FAILED'
        response.error = e
    }
    res.json(response)
}

const windowSwitch = async (req, res) => {
    let response = new Response()
    try {
        let participant = req.params.participant
        await participantModel.findByIdAndUpdate(participant, { $inc: {windowSwitch: 1 }, submissionType: 'Abnormal' }, {useFindAndModify: false})
    } catch (e) {
        
    }
    return response
}

const getResult = async (req, res) => {
    let response = new Response()
    try {
        let participant = req.params.participant
        const user = await participantModel.findById(participant).populate('company').populate('test')//.populate({ path: 'section.question', match: { questionType: "WRITTEN" }})
        const answers = await answerModel.find({participant}).populate('question')
        const result = await participantModel.findById(participant).populate({ path: 'section.question', match: { questionType: "MCQ" }}).select('section.question -_id')
        const questions = result.section.map((e, id1) => {
            return e.question
        })
        response.data = { user, answers, questions }
    } catch (e) {
        response.message = "Something went wrong."
        response.status = 'FAILED'
        response.error = e
    }
    res.json(response)
}

const update = async (req, res) => {
    let response = new Response()
    try {
        const { fq, data } = req.body
        await participantModel.updateMany( fq, data)
        response.message = "Updated successfully."
    } catch (e) {
        response.message = "Something went wrong."
        response.status = 'FAILED'
        response.error = e
    }
    res.json(response)
}

module.exports = {
    create, submitAnswer, listByTest, getQuestions, getResult, windowSwitch, startTest, update
}