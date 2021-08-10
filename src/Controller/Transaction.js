var Response = require('../config/Response')

const transactionModel = require('../model/Transaction')
const companyModel = require('../model/Company')


const createCredit = async (req, res, next) => {
    var response = new Response()
    const { amount, current, company} = req
    try {
        const data = new transactionModel({amount, prev: current-amount, company, current, 
            type: 'CREDIT', remarks: 'Okay'
        })
        await data.save()
        response.message = 'Amount credited successfully.'
    } catch (e) {
        response.status = 'FAILED'
        response.message = 'Unable to credit balance.'
        response.error = e
    }
    res.statusMessage = response.message
    res.json(response)
}

const findById = async (req, res) => {
    let response = new Response()
    try {
        let company = await companyModel.findOne({member: req.userId}).select('id')
        response.data = await transactionModel.find({company: company}).populate('company', 'name id')
    } catch (e) {
        response.message = "Something went wrong."
        response.status = 'FAILED'
    }
    res.json(response)
}
const findByCompany = async (req, res) => {
    let response = new Response()
    try {
        response.data = await transactionModel.find(req.body.fq).sort({createdAt: 'desc'})
    } catch (e) {
        response.message = "Something went wrong."
        response.status = 'FAILED'
    }
    res.json(response)
}
module.exports = {
    createCredit, findById, findByCompany
}