import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import createSagaMiddleware from "redux-saga"
import jobResponse from "./reducers/jobResponse"
import profile from "./reducers/profile"

const rootReducer = combineReducers({
    jobResponse: jobResponse, 
    profile: profile
})

export const sagaMiddleware = createSagaMiddleware()

let composeEnhancers = compose

const configureStore = () => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))
}

export default configureStore
