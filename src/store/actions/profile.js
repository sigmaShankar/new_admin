import { SET_PROFILE } from "./actionTypes"


export const setProfile = (profile) => {
/**
 * #### Declaring the profile action
 *
 */
    return {
        type: SET_PROFILE,
        profile: profile,
    }
}