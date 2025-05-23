import axios from "axios";
const API_URL = process.env.REACT_APP_MASTER_API_URL;

//JobDescription Master


export async function getJobDecProj() {
  let joburl = `${API_URL}/jobdescription`;
  let options = { headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}` },}
  return fetch(joburl, options).then((response) => response.json())
}

export function addNewJobDescription(JobDescription) {
    let joburl = `${API_URL}/jobdescription`;
    let options = { headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}` } }
    return axios.post(joburl, JobDescription, options)
}

export async function getLinkedProj(projectName) {
  let joburl = `${API_URL}/linkedproj/projectName/${encodeURIComponent(projectName)}`;
  let options = { headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}` },}
  return fetch(joburl, options).then((response) => response.json())
}


