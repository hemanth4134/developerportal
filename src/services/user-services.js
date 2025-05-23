import axios from "axios";

const API_URL = process.env.REACT_APP_MASTER_API_URL;


export async function getUsers() {
    let options = { headers : {Authorization : `Bearer ${sessionStorage.getItem('Token')}`}}
    let userUrl = `${API_URL}/user`;
    return fetch(userUrl,options)
    .then(response => response.json());
}

export async function getActiveUsers() {
    let options = { headers : {Authorization : `Bearer ${sessionStorage.getItem('Token')}`}}
    let userUrl = `${API_URL}/activeUser`;
    return fetch(userUrl,options)
    .then(response => response.json());
}

export async function authenticate(EmailId,accessToken) {
    let options = { headers : {Authorization : `Bearer ${accessToken}`}}
    let userUrl = `${API_URL}/authenticate/${EmailId}`;
    return fetch(userUrl,options)
        .then(response => response.json());
}


export function addNewUser(UserData) {
	let options = { headers : {Authorization : `Bearer ${sessionStorage.getItem('Token')}`}}
    let userurl = `${API_URL}/user`;
    return axios.post(userurl, UserData,options)
}


export function deleteUser(emailId) {
	let options = { headers : {Authorization : `Bearer ${sessionStorage.getItem('Token')}`}}
    let dltuserurl = `${API_URL}/deleteuser/${emailId}`;
    return axios.post(dltuserurl,'',options)
}

export function updateUser(UserData, emailId) {
	let options = { headers : {Authorization : `Bearer ${sessionStorage.getItem('Token')}`}}
    let updtuserurl = `${API_URL}/user/${emailId}`;
    return axios.post(updtuserurl,UserData,options)
}

export async function getTeamUser(team) {
    let options = { headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}` } }
    let userteam = `${API_URL}/user/team/${team}`;
    return fetch(userteam, options)
        .then(response => response.json());
}
