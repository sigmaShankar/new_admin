import axios from "axios"
import {BASE_URL} from "./constants"

export const signUp = async(body, type) => {
    return await axios.post(BASE_URL + type, body)
                .then(res => {
                    //console.log(res.data.error_code)
                    if(res.data.error_code == 1) {
                        return true
                    } else {
                        return false
                    }
                })
                .catch(err => {
                    //console.log(err)
                    return false
                })
}

export const isMailExist = (email) =>{
    return axios.get(BASE_URL + `/institution/checkMail/${email}`)
}
