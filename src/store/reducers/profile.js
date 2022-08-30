import { SET_PROFILE } from '../actions/actionTypes'

const initialState = {
    profile: undefined
};

const profile = (state = initialState, action) => {
    switch(action.type) {
        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile
            }        

        default:
            return state
    }
}

export default profile
