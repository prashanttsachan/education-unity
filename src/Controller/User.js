const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

const Response = require('../Config/Response')

const userModel = require('../Model/User')

const create = async (req, res) => {
    var response = new Response()
    const { email, mobile, name, password, profession} = req.body
    try {
        let user = await userModel.findOne({$or:[{email},{mobile}]})
        if (user) {
            throw('A user already exists with this email/mobile.')
        } else {
            let member = new userModel({
                email, name, mobile, password: bcrypt.hashSync(password, 10), profession
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
    var response = new Response()
    const { email, password, mobile } = req.body
    const user = await userModel.findOne({$or:[{email},{mobile}]});
    if (user && bcrypt.compareSync(password, user.password)) {
        const timestamp = new Date().getTime()
        const token = jwt.sign({ sub: user.id, iat: timestamp }, JWT_SECRET, { expiresIn: '1d' });
        response.message = 'Welcome ' + user.name + '! Logged In successfully ...'
        response.data = {
            user: {id: user._id, email: user.email, name: user.name, mobile: user.mobile },
            access_token: token,
            authenticate: true
        }
    } else {
        response.message = "Password doesn't match."
        response.status = 'FAILED'
    }
    res.json(response)
}

const authorization = async (req, res, next) => {
    var response = new Response()
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

const update = async ( req, res ) => {
    var response = new Response()
    try {
        const { update, query } = req.body
        await userModel.updateMany( query, update)
        response.message = "Details updated successfully."
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
        response.data = await userModel.find(query).select("-password")
    } catch (e) {
        response.message = "Something went wrong."
        res.error = e
    }
    res.statusMessage = response.message
    res.json(response)
}

module.exports = {
    create, login, authorization, update, list
    // login, authorization, checkAuth, LoggedInUser, userById, userList, editLoggedInUser, 
    // changePassword, runDaemon
}