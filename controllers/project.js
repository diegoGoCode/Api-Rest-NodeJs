'use strict'

var Project = require('../models/project');

var controller  = {
    saveProject: function(req, res){
        var project = new Project();
        var params = req.body;

        project.name = params.name;
        project.descripcion = params.descripcion;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        project.save((err, projectStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar el documento.'});
            if(!projectStored) return res.status(404).send({message: 'No se ha podido guardar el proyecto'});

            return res.status(200).send({
                project: projectStored
            });
        });
    },
    getProject: function(req, res){
        var projectId = req.params.id;
        if(projectId == null) return res.status(404).send({message:'El proyecto solicitado no existe en la db.'});

        Project.findById(projectId, (err, project) =>{
            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});
            if(!project) return res.status(404).send({message: 'El proyecto solicitado no existe en la db.'});
            return res.status(200).send({
                project
            });
        });
    },
    getProjects: function(req, res){
        //.sort('.year') es para ordenar los registros por el año de Mayor a Menor
        Project.find({}).sort('-year').exec((err, projects) => {
            if(err) return res.status(500).send({message:'Error al devolver los datos.'});

            if(!projects) return res.status(404).send({message:'No hay proyectos en la bd.'});

            return res.status(200).send({projects});
        });
    },
    updateProject: function(req, res){
        var idProject = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(idProject, update, {new:true}, (err, projectUpdated) => {
            if(err) return res.status(500).send({message:'Error al actualizar'});
            if(!projectUpdated) return res.status(404).send({message:'No existe el proyecto a actualizar'});
            return res.status(200).send({
                projectUpdated: projectUpdated
            });
        });
    },
    deleteProject: function(req, res){
        var idProject = req.params.id;
        Project.findByIdAndRemove(idProject, (err, projectDeleted) => {
            if(err) return res.status(500).send({message:'Error al eliminar el proyecto'});
            if(!projectDeleted) return res.status(404).send({message:'No existe el proyecto a eliminar'});
            return res.status(200).send({
                projectDeleted: projectDeleted
            });
        });
    }
};

module.exports = controller;