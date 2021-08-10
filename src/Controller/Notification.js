var Response = require('../config/Response')

const notificationModel = require('../model/Notification')

const listByUser = async (req, res) => {
    let response = new Response()
    try {
        response.data = await notificationModel.find({ member: req.userId })
    } catch (e) {
        response.data = []
        response.message = "Something went wrong."
        response.status = 'FAILED'
        response.error = e
    }
    res.json(response)
}

module.exports = {
    listByUser
}