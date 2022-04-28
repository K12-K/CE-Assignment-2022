import axios from "axios"

export const getAllProjects = async () => {
    const response = await axios.get('/project/all').catch((error) => {
        console.log('Error...', error)
        throw new Error('Error getting all projects')
    })
    if (response.status === 200) {
        return response.data.projects
    } else
        throw new Error('Error during fetch of all projects')
}

export const addProject = async (projectData) => {
    const response = await axios.post('/project/add', projectData).catch((error) => {
        console.log('Error...', error)
        throw new Error('Error adding project')
    })
    if (response.status === 200) {
        return response.data
    } else
        throw new Error('Error during add of project')
}

export const getProject = async (projectId) => {
    const response = await axios.get(`/project/get/${projectId}`).catch((error) => {
        console.log('Error...', error)
        throw new Error('Error getting project')
    })
    if (response.status === 200) {
        return response.data
    } else
        throw new Error('Error during fetch of project')
}

export const updateProject = async (projectId, projectData) => {
    const response = await axios.put(`/project/update/${projectId}`, projectData).catch((error) => {
        console.log('Error...', error)
        throw new Error('Error updating project')
    })
    if (response.status === 200) {
        return response.data
    } else
        throw new Error('Error during update of project')
}

export const deleteProject = async (projectId) => {
    const response = await axios.delete(`/project/delete/${projectId}`).catch((error) => {
        console.log('Error...', error)
        throw new Error('Error deleting project')
    })
    if (response.status === 200) {
        return response.data
    } else
        throw new Error('Error during delete of project')
}