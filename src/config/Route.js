const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => { res.send("This app is working fine.") } );

const User = require('../Controller/User')
// const Ad = require('../Controller/Advertisement')
// const Social = require('../Controller/SocialWork')
// const Donation = require('../Controller/Donation')
// const NGO = require('../Controller/NGO')
// const msg = require('../Controller/Message')
// const Quiz = require('../Controller/Quiz')
// const Question = require('../Controller/Question')
// const Answer = require('../Controller/Answer')

// // User routes
routes.get('/', (req, res) => { res.send("This app is working fine.") } );

// // User routes
routes.post('/user/create', User.Create);
// routes.post('/user/login', User.login);
routes.post('/user/update', (req, res, next) => { next() }, User.Update);
routes.post('/user/list', (req, res, next) => { next() }, User.Find);

// // Ad routes
// routes.post('/advertisement/create', User.authorization, Ad.create);
// routes.post('/advertisement/update', User.authorization, Ad.update);
// routes.post('/advertisement/list', User.authorization, Ad.list);

// // SocialWork routes
// routes.post('/social-work/create', User.authorization, Social.create);
// routes.post('/social-work/update', User.authorization, Social.update);
// routes.post('/social-work/list', User.authorization, Social.list);

// // Donation routes
// routes.post('/donation/create', User.authorization, Donation.create);
// routes.post('/donation/update', User.authorization, Donation.update);
// routes.post('/donation/list', User.authorization, Donation.list);

// // NGO routes
// routes.post('/ngo/create', User.authorization, NGO.create);
// routes.post('/ngo/update', User.authorization, NGO.update);
// routes.post('/ngo/list', User.authorization, NGO.list);

// // Message routes
// routes.post('/message/create', User.authorization, msg.create);
// routes.post('/message/update', User.authorization, msg.update);
// routes.post('/message/list', User.authorization, msg.list);

// // Quiz routes
// routes.post('/quiz/create', User.authorization, Quiz.create);
// routes.post('/quiz/update', User.authorization, Quiz.update);
// routes.post('/quiz/list', User.authorization, Quiz.list);

// // Question routes
// routes.post('/question/create', User.authorization, Question.create);
// routes.post('/question/update', User.authorization, Question.update);
// routes.post('/question/list', User.authorization, Question.list);

// // Answer routes
// routes.post('/answer/create', User.authorization, Answer.create);
// routes.post('/answer/update', User.authorization, Answer.update);
// routes.post('/answer/list', User.authorization, Answer.list);

module.exports = {
    routes
}