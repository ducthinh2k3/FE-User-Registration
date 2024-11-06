import axios from "axios";
const BASE_URL = "https://be-user-registration.onrender.com";
const headers = {
    
}

export const fetchDataFromAPI = async(url, token) => {
    if (token) {
        headers.Authorization = "Bearer " + token;
    }
    try {
        const {data} = await axios.get(
            BASE_URL + url,
            {
                headers: headers,
                // params
            }
        )
        return data;
    } catch (error) {
        throw error; 

    }
}

export const postDataToAPI = async(url, body, token, cookie, params) => {
    if (token) {
        headers.Authorization = "Bearer " + token;
    }
    try {
        const {data} = await axios.post(
            BASE_URL + url,
            body,
            {
                headers: headers,
                params,
                withCredentials: true
            }
        )
        return data;
    } catch (error) {
        throw error; 

    }
}