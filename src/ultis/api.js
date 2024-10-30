import axios from "axios";
const BASE_URL = "https://be-user-registration.onrender.com";
// const headers = {
//     Authorization: `Client-ID ${ACCESS_TOKEN}`
// }

export const fetchDataFromAPI = async(url, headers) => {
    try {
        const {data} = await axios.get(
            BASE_URL + url,
            {
                headers,
                // params
            }
        )
        return data;
    } catch (error) {
        throw error; 

    }
}

export const postDataToAPI = async(url, body, token, cookie, params) => {
    try {
        const {data} = await axios.post(
            BASE_URL + url,
            body,
            {
                headers: {
                    Authorization: "Bearer " + token,
                    Cookie: cookie
                },
                params,
                withCredentials: true
            }
        )
        return data;
    } catch (error) {
        throw error; 

    }
}