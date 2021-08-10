var Response = require('../config/Response')

const companyModel = require('../model/Company')


const create = async (req, res, next) => {
    var response = new Response()
    const { name, address, member, category } = req.body
    try {
        let company = await companyModel.findOne({member})
        if (company) {
            throw('A company already exists for this user.')
        } else {
            let data = new companyModel({name, address, member, category})
            let resData = await data.save()
            if (resData) {
                response.message = 'Company has been added successfully.'
            } else {
                throw('Something went wrong.')
            }
        }
    } catch (e) {
        response.status = 'FAILED'
        response.message = 'Unable to create company account.'
        response.error = e
    }
    res.statusMessage = response.message
    res.json(response)
}

const list = async (req, res) => {
    let response = new Response()
    try {
        response.data = await companyModel.find().populate('category._id', 'name id').populate('member', 'firstname id email lastname mobile')
    } catch (e) {
        response.message = "Something went wrong."
        response.status = 'FAILED'
        response.error = e
    }
    res.json(response)
}

const findById = async (req, res) => {
    let response = new Response()
    const { id } = req.body
    const company = await companyModel.findById(id).populate('category._id', 'name id').populate('member', 'firstname id email lastname mobile')
    if (company) {
        response.data = {
            ...company.toJSON()
        }
    } else {
        response.message = "Something went wrong."
        response.status = 'FAILED'
    }
    res.json(response)
}

const findByClientId = async (req, res) => {
    let response = new Response() //.populate('category._id', 'name id')
    try {
        response.data = await companyModel.findOne({member: req.params.clientid}).populate('member', 'firstname id email lastname mobile')
    } catch (e) {
        response.message = "Something went wrong."
        response.status = 'FAILED'
    }
    res.json(response)
}

const recharge = async (req, res, next) => {
    let response = new Response()
    const { id, amount } = req.body
    try {
        const updatedData = await companyModel.findByIdAndUpdate(id, { $inc: { balance: amount }}, {useFindAndModify: false, new: true}) 
        req.amount = amount
        req.current = updatedData.balance
        req.company = id
        next()
    } catch (e) {
        response.message = "Something went wrong."
        response.status = 'FAILED'
        response.error = e
        res.json(response)
    }
}

const updateContact = async (req, res, next) => {
    let response = new Response()
    const { fq, data } = req.body
    try {
        await companyModel.updateOne(fq, data)
        response.message = "Updated successfully."
    } catch (e) {
        response.message = "Something went wrong."
        response.status = 'FAILED'
        response.error = e
    }
    res.json(response)
}

module.exports = {
    create, list, findById, recharge, findByClientId, updateContact
}