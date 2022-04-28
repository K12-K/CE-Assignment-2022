import { combineReducers } from "redux"
import { projectReducer, projectViewReducer, searchProjectsReducer } from "./projectReducer"

const reducers = combineReducers({
    projects: projectReducer,
    projectView: projectViewReducer,
    searchProjects: searchProjectsReducer
})

export default reducers