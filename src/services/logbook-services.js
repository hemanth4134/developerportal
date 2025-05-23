import axios from "axios";

const API_URL = process.env.REACT_APP_LOGBOOK_API_URL;

export async function getDashboard(status) {
  let url = `${API_URL}/status/${status}`;
  let options = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
  };
  return fetch(url, options).then((response) => response.json());
}

export async function getIterationCountforRequest(logBookId) {
  let url = `${API_URL}/iterations/${logBookId}`;
  let options = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
  };
  return fetch(url, options).then((response) => response.json());
}

export async function getWelderInput(logBookId, Iteration) {
  let url = `${API_URL}/welder/logId/${logBookId}/Itr/${Iteration}`;
  let options = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
  };
  return fetch(url, options).then((response) => response.json());
}

export async function getWelderData(logBookId) {
  let url = `${API_URL}/welder/logId/${logBookId}/`;
  let options = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
  };
  return fetch(url, options).then((response) => response.json());
}

export async function getNDTInput(logBookId, Iteration) {
  let url = `${API_URL}/feedback/logId/${logBookId}/Itr/${Iteration}`;
  let options = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
  };
  return fetch(url, options).then((response) => response.json());
}

export async function addLogbookData(logbookData) {
  let url = `${API_URL}/welder`;
  return axios.post(url, logbookData, {
    headers: {
      // "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
    },
  });
}

export async function addFeedbackData(feedbackData) {
  let url = `${API_URL}/feedback`;
  return axios.post(url, feedbackData, {
    headers: {
      // "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
    },
  });
}

export async function getLogbookData(logbookId) {
  let url = `${API_URL}/logdata/${logbookId}`;
  let options = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
  };
  const response = await axios
    .get(url, options)
    .then(function (resp) {
      return resp;
    })
    .catch(function (error) {
      return { message: "Unable to find logbookid request", status: false };
    });

  return response.data;
}

export async function getJobDescData(jobDesc, SeamNo) {
  let jobParam = encodeURIComponent(jobDesc);
  let seamParam = encodeURIComponent(SeamNo);
  let url = `${API_URL}/jobMaster?JobDescription=${jobParam}&SeamNo=${seamParam}`;
  let options = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
  };
  const response = await axios
    .get(url, options)
    .then(function (resp) {
      return resp;
    })
    .catch(function (error) {
      return { message: "Unable to find request", status: false };
    });

  return response.data;
}

export async function getJobDescriptions() {
  let url = `${API_URL}/jobMaster/JobDescription`;
  let options = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
  };
  const response = await axios
    .get(url, options)
    .then(function (resp) {
      return resp;
    })
    .catch(function (error) {
      return { message: "Unable to find jobMaster request", status: false };
    });

  return response.data;
}

export async function getFile(logBookId, file, fileName) {
  let url = `${API_URL}/download/logId/${logBookId}/file/${file}/Name/${fileName}`;
  let options = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
  };
  const response = await axios
    .get(url, options)
    .then(function (resp) {
      return resp;
    })
    .catch(function (error) {
      return { message: "Unable to fetch File", status: false };
    });
  var preSignedUrl = response.data.url;
  const link = document.createElement("a");
  link.href = preSignedUrl;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(link.href);
  link.parentNode.removeChild(link);
}

export async function getReport() {
  let url = `${API_URL}/report`;
  let options = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
  };
  const response = await axios
    .get(url, options)
    .then(function (resp) {
      return resp;
    })
    .catch(function (error) {
      return { message: "Unable to Fetch Report", status: false };
    });

  return response.data;
}

export async function getManual(folderName, fileName) {
  let url = `${API_URL}/manual/${folderName}/${fileName}`;

  let options = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
  };
  const response = await axios
    .get(url, options)
    .then(function (resp) {
      return resp;
    })
    .catch(function (error) {
      return { message: "Unable to Fetch UserManual", status: false };
    });

  return response.data;
}

export const submitFiles = async (signedURL, file) => {
  if (signedURL) {
      await axios.put(signedURL, file);
  }
}