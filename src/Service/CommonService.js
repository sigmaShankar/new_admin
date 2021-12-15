import axios from "axios"
import {BASE_URL} from "./constants"

const getDesignation = () => {
    return axios.get(BASE_URL + '/')
}

