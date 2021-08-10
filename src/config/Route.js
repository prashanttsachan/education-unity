const express = require('express');
const routes = express.Router();

const ImageController = require('../controller/ImageController')
const User = require('../controller/User');
const Category = require('../controller/Category');
const Company = require('../controller/Company');
const Transaction = require('../controller/Transaction');
const Section = require('../controller/Section');
const Question = require('../controller/Question');
const Test = require('../controller/Test');
const Ticket = require('../controller/Ticket');
const Participant = require('../controller/Participant');
const Notification = require('../controller/Notification');

// User routes
routes.post('/user/create', User.create);
routes.post('/user/login', User.login);
routes.get('/user/check-auth', User.checkAuth);
routes.post('/user/change-password', User.authorization, User.changePassword);
routes.get('/user/get-logged-in-user', User.authorization, User.LoggedInUser);
routes.post('/user/userById', User.authorization, User.userById);
routes.get('/user/user-list', User.authorization, User.userList);
routes.post('/user/edit-loggedin-user', User.authorization, User.editLoggedInUser);

// Company category routes
routes.post('/category/create', User.authorization, Category.create);
routes.post('/category/edit', User.authorization, Category.edit);
routes.get('/category/list', User.authorization, Category.list);

// Company routes
routes.post('/company/create', User.authorization, Company.create);
routes.get('/company/list', User.authorization, Company.list);
routes.post('/company/find-by-id', User.authorization, Company.findById);
routes.get('/company/:clientid', User.authorization, Company.findByClientId);
routes.post('/company/recharge', User.authorization, Company.recharge, Transaction.createCredit);

// Transaction
routes.get('/transaction/list', User.authorization, Transaction.findById);

// Company category routes
routes.post('/section/create', User.authorization, Section.create);
routes.post('/section/edit', User.authorization, Section.edit);
routes.get('/section/list', User.authorization, Section.list);

routes.post('/question/written/create', User.authorization, Question.questionWritten);
routes.post('/question/written/edit', User.authorization, Question.questionWrittenEdit);
routes.post('/question/mcq/create', User.authorization, Question.questionMCQ);
routes.post('/question/mcq/edit', User.authorization, Question.questionMCQEdit);
routes.post('/question/image/create', User.authorization, ImageController.upload.fields([{ name: 'questionImage'}, { name: 'optionAImage'}, { name: 'optionBImage'}, { name: 'optionCImage'}, { name: 'optionDImage'} ]), Question.questionImage);
routes.get('/question/list', User.authorization, Question.list);
routes.get('/question/:id', User.authorization, Question.findById);

// Test routes
routes.post('/test/create', User.authorization, Test.create);
routes.post('/test/edit', User.authorization, Test.edit);
routes.get('/test/list', User.authorization, Test.list);

// Ticket routes
routes.post('/ticket/create', User.authorization, Ticket.create);
routes.post('/ticket/edit', User.authorization, Ticket.edit);
routes.get('/ticket/list', User.authorization, Ticket.list);
routes.get('/ticket/:id', User.authorization, Ticket.findById);

// Client routes
routes.get('/client/ticket/list', User.authorization, Ticket.clientList);
routes.get('/client/notifications', User.authorization, Notification.listByUser);
routes.get('/client/test/list', User.authorization, Test.clientList);
routes.post('/client/transactions', User.authorization, Transaction.findByCompany);
routes.post('/client/contact-details/update', User.authorization, Company.updateContact);
routes.post('/client/participants', User.authorization, Participant.listByTest);
routes.post('/client/participant/update', User.authorization, Participant.update);
routes.get('/client/participant/:participant', User.authorization, Participant.getResult);
// routes.get('/client/:company/:test/participants', User.authorization, Participant.listByTest);

// Partipants Test routes
routes.get('/test/question/:id', Participant.getQuestions);
routes.get('/test/start-test/:participant', Participant.startTest);
routes.get('/test/:company/:test', Test.checkTest);
routes.get('/test/:company/:test/answer', Test.checkTest);
routes.get('/test/:test', Test.testById);
routes.post('/test/register', Participant.create);
routes.post('/test/answer', Participant.submitAnswer);
routes.get('/test/window/switch/:participant', Participant.windowSwitch);

routes.get('/run/daemon/update', User.runDaemon);
// routes.get('/test/list', User.authorization, Test.list);

module.exports = {
    routes
}