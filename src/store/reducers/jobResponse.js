import { SET_JOB_RESPONSE, SET_JOB_RESPONSE_COUNT } from '../actions/actionTypes'

const initialState = {
    responseToView: 0,
    jobResponse: []
};

const jobResponse = (state = initialState, action) => {
    switch(action.type) {
        case SET_JOB_RESPONSE_COUNT:
            return {
                ...state,
                responseToView: action.responseToView
            }
        
        case SET_JOB_RESPONSE:
            return {
                ...state,
                jobResponse: action.jobResponse,
                responseToView: action.responseToView
            }
        

        default:
            return state
    }
}

export default jobResponse
