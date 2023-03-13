import { SET_PROFILE } from "./actionTypes"


export const setProfile = (profile) => {
    //console.log('****************')
    //console.log(profile)
    return {
        type: SET_PROFILE,
        profile: profile,
    }
}