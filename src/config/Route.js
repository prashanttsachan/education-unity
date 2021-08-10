const express = require('express');
const routes = express.Router();
const Response = require('./Response')

routes.get('/', (req, res) => { res.json(new Response()) } );

module.exports = {
    routes
}