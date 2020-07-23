'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');
var router = express.Router();

router.get('/projects', ProjectController.getProjects);
router.get('/project/:id?', ProjectController.getProject);
router.post('/project', ProjectController.saveProject);
router.put('/project/:id', ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);

module.exports = router;