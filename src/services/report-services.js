import axios from "axios";

const API_URL = process.env.REACT_APP_LOGBOOK_API_URL;

export async function getAllLogRequests(filter) {
    let reporturl = `${API_URL}/logreport`;
    let options = { headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}` } }
    return axios.post(reporturl,filter, options)
}

export async function getWeldData(filter) {
    let reporturl = `${API_URL}/weldingreport`;
    let options = { headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}` } }
    return axios.post(reporturl,filter, options)
}

export async function getFeedback(logBookId) {
    let reporturl = `${API_URL}/ndtreport`;
    let options = { headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}` } }
    return axios.post(reporturl,logBookId, options)
}

