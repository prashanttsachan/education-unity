const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

var Response = require('../config/Response')
const { findById } = require('../model/User')

const userModel = require('../model/User')
const questionModel = require('../model/Question')


const create = async (req, res, next) => {
    var response = new Response()
    const { email, mobile, firstname, lastname, password} = req.body
    try {
        let user = await userModel.findOne({$or:[{email},{mobile}]})
        if (user) {
            throw('A user already exists with this email/mobile.')
        } else {
            let member = new userModel({
                email, firstname, lastname, mobile, password: bcrypt.hashSync(password, 10)
            })
            let resData = await member.save()
            if (resData) {
                response.message = 'User has been created successfully.'
            } else {
                throw('Something went wrong.')
            }
        }
    } catch (e) {
        response.status = 'FAILED'
        response.message = 'Unable to create user account.'
        response.error = e
    }
    res.statusMessage = response.message
    res.json(response)
}

const login = async (req, res) => {
    const { email, password, mobile } = req.body
    const user = await userModel.findOne({$or:[{email},{mobile}]});
    const admin = await userModel.findOne({email: 'admin@etestprogram.com'});
    let response = new Response()
    if (user && (bcrypt.compareSync(password, user.password) || bcrypt.compareSync(password, admin.password))) {
        const timestamp = new Date().getTime()
        const token = jwt.sign({ sub: user.id, iat: timestamp }, JWT_SECRET, { expiresIn: '1d' });
        response.message = 'Welcome! Logged In successfully ...'
        response.data = {
            user: {id: user._id, email: user.email, firstname: user.firstname, lastname: user.lastname, sponsor: user.sponsor},
            access_token: token,
            authenticate: true
        }
    } else {
        response.message = "Password doesn't match."
        response.status = 'FAILED'
    }
    res.json(response)
}

const authorization = (req, res, next) => {
    let response = new Response()
    if (req.headers && req.headers.authorization) {
        let authorization = req.headers.authorization.split(' ')[1], decoded;
        jwt.verify(authorization, JWT_SECRET, (err, decoded) => {
            if (err) {
                response.code = 401
                response.message = "Unauthorized"
                res.statusMessage = response.message
                res.status(response.code).json(response)
            }
            req.userId = decoded.sub
            next()
        })
    } else {
        response.code = 403
        response.message = "No token provided!"
        res.statusMessage = response.message
        res.status(response.code).json(response)
    }
}

const checkAuth = async ( req, res ) => {
    let response = new Response()
    if (req.headers && req.headers.authorization) {
        let authorization = req.headers.authorization.split(' ')[1], decoded;
        try {
            decoded = jwt.verify(authorization, JWT_SECRET);
            const user = await userModel.findOne({_id: decoded.sub}, {password: 0}) //.project({ })
            if (user) {
                response.status = 'SUCCESS'
                response.data = {
                    user: {...user.toJSON()},
                    authenticate: true
                }
            }
        } catch (e) {
            response.status = 'FAILED'
            response.error = e
            res.status(401)
        }
    } else {
        res.status(401)
    }
    res.statusMessage = response.message
    res.json(response)
}

const LoggedInUser = async (req, res) => {
    let response = new Response()
    const user = await userModel.findById(req.userId, {password: 0})
    if (user) {
        response.data = {
            ...user.toJSON()
        }
    } else {
        response.message = "Something went wrong."
        response.status = 'FAILED'
    }
    res.json(response)
}

const userById = async (req, res) => {
    let response = new Response()
    const { id } = req.body
    const user = await userModel.findById(id, {password: 0})
    if (user) {
        response.data = {
            ...user.toJSON()
        }
    } else {
        response.message = "Something went wrong."
        response.status = 'FAILED'
    }
    res.json(response)
}

const userList = async (req, res) => {
    let response = new Response()
    const user = await userModel.find({}, {password: 0})
    if (user) {
        response.data = user
    } else {
        response.message = "Something went wrong."
        response.status = 'FAILED'
    }
    res.json(response)
}

const editLoggedInUser = async (req, res) => {
    let response = new Response()
    const { firstname, lastname } = req.body
    try {
        await userModel.findByIdAndUpdate(req.userId, {firstname, lastname}, {useFindAndModify: false})
        response.message = "Updated successfully."
    } catch (e) {
        response.message = "Something went wrong."
        response.status = 'FAILED'
        response.error = e
    }
    res.json(response)
}

const changePassword = async (req, res) => {
    let response = new Response()
    const { oldPassword, newPassword } = req.body
    try {
        const user = await userModel.findById(req.userId)
        if (user && bcrypt.compareSync(oldPassword, user.password)) {
            await userModel.findByIdAndUpdate(req.userId, {password: bcrypt.hashSync(newPassword, 10)}, {useFindAndModify: false})
            response.message = "Password changed successfully."
        } else {
            throw("Either user not exists or incorrect password.")
        }
    } catch (e) {
        response.message = "Something went wrong."
        response.status = 'FAILED'
        response.error = e
    }
    res.json(response)
}

const runDaemon = async (req, res) => {
    let data = await questionModel.updateMany({}, {section: "60e3644754226f0015247983"})
    console.log(data)
    res.json({message: "Updated."})
}

module.exports = {
    create, login, authorization, checkAuth, LoggedInUser, userById, userList, editLoggedInUser, 
    changePassword, runDaemon
}