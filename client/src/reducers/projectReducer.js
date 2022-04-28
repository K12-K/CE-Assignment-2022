import ActionTypes from "../constants/action-types";

const initialState = {
    projects: []
}
const viewInitialState = {
    name: "",
    desciption: "",
    skillset: [],
    noofmembers: ""
}

export const projectReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_ALL_PROJECTS:
            return { ...state, projects: payload }
        case ActionTypes.ADD_PROJECT:
            return { ...state, projects: state.projects.concat(payload)}
        case ActionTypes.UPDATE_PROJECT:
            {
                const projects = state.projects
                projects.map((ele) => {
                    if (ele._id === payload._id) {
                        const upele = ele
                        upele.name = payload.name
                        upele.description = payload.description
                        upele.skillset = payload.skillset
                        upele.noofmembers = payload.noofmembers
                        upele.isactive = payload.isactive
                        return upele
                    } else {
                        return ele
                    }
                })
                return { ...state, projects: projects }
            }
        case ActionTypes.DELETE_PROJECT:
            {
                let projects = state.projects
                projects = projects.filter((ele) => {
                    if (ele._id === payload)
                        return false
                    return true
                })
                return { ...state, projects: projects }
            }
        default:
            return state
    }
}

export const projectViewReducer = (state = viewInitialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.GET_PROJECT_VIEW:
            return { ...state, ...payload }
        case ActionTypes.DELETE_PROJECT_VIEW:
            return viewInitialState
        default:
            return state
    }
}

export const searchProjectsReducer = (state = { searchprojects: [] }, { type, payload }) => {
    switch (type) {
        case ActionTypes.SEARCH_PROJECTS:
            return { ...state, searchprojects: payload }
        default:
            return state
    }
}