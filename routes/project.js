'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');
var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'});

router.get('/projects', ProjectController.getProjects);
router.get('/project/:id?', ProjectController.getProject);
router.post('/project', ProjectController.saveProject);
router.put('/project/:id', ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);
router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);

module.exports = router;