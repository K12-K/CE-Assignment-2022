import ActionTypes from "../constants/action-types"

export const setAllProjects = (projects) => {
    return ({
        type: ActionTypes.SET_ALL_PROJECTS,
        payload: projects
    })
}

export const addProject = (project) => {
    return ({
        type: ActionTypes.ADD_PROJECT,
        payload: project
    })
}

export const updateProject = (project) => {
    return ({
        type: ActionTypes.UPDATE_PROJECT,
        payload: project
    })
}

export const deleteProject = (projectId) => {
    return ({
        type: ActionTypes.DELETE_PROJECT,
        payload: projectId
    })
}

export const getProjectView = (project) => {
    return ({
        type: ActionTypes.GET_PROJECT_VIEW,
        payload: project
    })
}

export const deleteProjectView = () => {
    return ({
        type: ActionTypes.DELETE_PROJECT_VIEW
    })
}

export const searchProjects = (projects) => {
    return ({
        type: ActionTypes.SEARCH_PROJECTS,
        payload: projects
    })
}