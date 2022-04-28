const express = require('express')
const { ProjectModel } = require('./models/ProjectModel')
const moment = require("moment")
const router = express.Router()

router.get('/all', async (req, res) => {
    res.status(200).json(await getAllProjects().catch((error) => {
        res.status(503).json({
            error: '' + error
        })
    }))
})

router.post('/add', async (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const skillset = req.body.skillset
    const noofmembers = req.body.noofmembers
    const isactive = req.body.isactive
    if (name != null || description != null || skillset != null || noofmembers != null || isactive != null) {
        res.status(200).json(await addProject(name, description, skillset, noofmembers, isactive).catch((error) => {
            res.status(503).json({
                error: '' + error
            })
        }))
    } else {
        res.status(400).json({
            error: 'Error recieving project data..'
        })
    }
})

router.get('/get/:projectId', async (req, res) => {
    const projectId = req.params.projectId
    if (projectId != null) {
        res.status(200).json(await getProject(projectId).catch((error) => {
            res.status(503).json({
                error: '' + error
            })
        }))
    } else {
        res.status(400).json({
            error: 'Error recieving project id..'
        })
    }
})

router.put('/update/:projectId', async (req, res) => {
    const projectId = req.params.projectId
    const projectBody = req.body
    if (projectId != null) {
        res.status(200).json(await updateProject(projectId, projectBody).catch((error) => {
            res.status(503).json({
                error: '' + error
            })
        }))
    } else {
        res.status(400).json({
            error: 'Error recieving project id..'
        })
    }
})

router.delete('/delete/:projectId', async (req, res) => {
    const projectId = req.params.projectId
    if (projectId != null) {
        res.status(200).json(await deleteProject(projectId).catch((error) => {
            res.status(503).json({
                error: '' + error
            })
        }))
    } else {
        res.status(400).json({
            error: 'Error recieving project id..'
        })
    }
})


const getAllProjects = async () => {
    try {
        const allData = await ProjectModel.find()
        if (allData === null) {
            return {
                projects: []
            }
        }
        return {
            projects: allData
        }
    } catch (error) {
        throw new Error('Error getting all projects')
    }
}

const addProject = async (name, description, skillset, noofmembers, isactive) => {
    try {
        const project = await new ProjectModel({
            name: name,
            description: description,
            skillset: skillset,
            noofmembers: noofmembers,
            isactive: isactive,
            createddate: moment(Date.now()).format('DD-MM-YYYY hh:mm A')
        }).save().catch((error) => {
            if (error.name === 'MongoServerError' && error.code === 11000) {
                throw new Error('Project already exists!!!')
            }
            throw new Error(error.message)
        })
        return project
    } catch (error) {
        throw new Error('Error adding project')
    }
}

const getProject = async (projectId) => {
    try {
        const projectData = await ProjectModel.findById(projectId).catch((error) => {
            throw new Error(error.message)
        })
        return projectData
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateProject = async (projectId, projectBody) => {
    try {
        const projectData = await ProjectModel.findByIdAndUpdate(projectId, projectBody).catch((error) => {
            throw new Error(error.message)
        })
        return projectData
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteProject = async (projectId) => {
    try {
        const projectData = await ProjectModel.findByIdAndDelete(projectId).catch((error) => {
            throw new Error(error.message)
        })
        return projectData
    } catch (error) {
        throw new Error(error.message)
    }
}


module.exports = router