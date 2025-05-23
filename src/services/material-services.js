import axios from "axios";
const API_URL = process.env.REACT_APP_MASTER_API_URL;


//Material Master
export async function getMaterials() {
    let materialurl = `${API_URL}/material`;
    let options = { headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}` } }
    return fetch(materialurl, options)
    .then(response => response.json());
}

export function addNewMaterial(Material) {
    let materialurl = `${API_URL}/material`;
    let options = { headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}` } }
    return axios.post(materialurl, Material, options)
}

export function deleteMaterial(materialid) {
    let dlturl = `${API_URL}/deletematerial/materialid/${materialid}`;
    let options = { headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}` } }
    return axios.post(dlturl,'',options)
}

export function updateMaterial(Material, materialid) {
    let dlturl = `${API_URL}/material/materialid/${materialid}`;
    let options = { headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}` } }
    return axios.post(dlturl,Material,options)
}


//Project Master
export async function getProject() {
    let projurl = `${API_URL}/project`;
    let options = { headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}` } }
    return fetch(projurl,options)
        .then(response => response.json());
}

export function addNewProject(ProjectData) {
    let projurl = `${API_URL}/project`;
    let options = { headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}` } }
    return axios.post(projurl, ProjectData,options)
}


export function deleteProject(projectid) {
    let dltprojurl = `${API_URL}/deleteproject/projectid/${projectid}`;
    let options = { headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}` } }
    return axios.post(dltprojurl,'',options)
}

export function updateProject(ProjectData, projectid) {
    let updturl = `${API_URL}/project/projectid/${projectid}`;
    let options = { headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}` } }
    return axios.post(updturl, ProjectData,options)
}


//Stage Master
export async function getStages() {
    let stageurl = `${API_URL}/stage`;
    let options = { headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}` } }
    return fetch(stageurl,options)
        .then(response => response.json());
}

export function addNewStage(StageData) {
    console.log(StageData)
    let stageurl = `${API_URL}/stage`;
    let options = { headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}` } }
    return axios.post(stageurl, StageData,options)
}


export function deleteStage(stageid) {
    let dltstgurl = `${API_URL}/deletestage/stageid/${stageid}`;
    let options = { headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}` } }
    return axios.post(dltstgurl,'',options)
}

export function updateStage(StageData, stageid) {
    let dlturl = `${API_URL}/stage/stageid/${stageid}`;
    let options = { headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}` } }
    return axios.post(dlturl,StageData,options)
}




//Technique Master
export async function getTechnique() {
    let techurl = `${API_URL}/technique`;
    let options = { headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}` } }
    return fetch(techurl,options)
        .then(response => response.json());
}

export function addNewTechnique(TechniqueData) {
    let techurl = `${API_URL}/technique`;
    let options = { headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}` } }
    return axios.post(techurl, TechniqueData,options)
}


export function deleteTechnique(techniqueid) {
    let dlttechurl = `${API_URL}/deletetechnique/techniqueid/${techniqueid}`;
    let options = { headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}` } }
    return axios.post(dlttechurl,'',options)
}

export function updateTechnique(TechniqueData, techniqueid) {
    let updttechurl = `${API_URL}/technique/techniqueid/${techniqueid}`;
    let options = { headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}` } }
    return axios.post(updttechurl, TechniqueData,options)
}



//welding Process Master
export async function getWeldingProcess() {
    let weldurl = `${API_URL}/welding`;
    let options = { headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}` } }
    return fetch(weldurl,options)
        .then(response => response.json());
}

export function AddNewWeldingProcess(WeldingProcessData) {
    console.log(WeldingProcessData)
    let weldurl = `${API_URL}/welding`;
    let options = { headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}` } }
    return axios.post(weldurl, WeldingProcessData,options)
}


export function DeleteWeldingProcess(weldingProcessid) {
    let dltweldurl = `${API_URL}/deletewelding/weldingProcessid/${weldingProcessid}`;
    let options = { headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}` } }
    return axios.post(dltweldurl,'',options)
}

export function UpdateWeldingProcess(WeldingProcessData, weldingProcessid) {
    let updateurl = `${API_URL}/welding/weldingProcessid/${weldingProcessid}`;
    let options = { headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}` } }
    return axios.post(updateurl, WeldingProcessData,options)
}



