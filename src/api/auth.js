import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
export async function userSignUp(data) {
    return await axios.post(`${BASE_URL}/crm/api/v1/auth/signup`, data);
}

export async function userLogin(data) {
    return await axios.post(`${BASE_URL}/crm/api/v1/auth/signin`, data);
}