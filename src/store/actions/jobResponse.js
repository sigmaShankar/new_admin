import { SET_JOB_RESPONSE, SET_JOB_RESPONSE_COUNT } from "./actionTypes"

export const setJobResponseCountToZero = () => {
    return {
        type: SET_JOB_RESPONSE_COUNT,
        responseToView: 0
    }
}

export const setJobResponse = (jobResponse, responseToView) => {
    //console.log(jobResponse)
    return {
        type: SET_JOB_RESPONSE,
        jobResponse: jobResponse,
        responseToView: responseToView
    }
}
