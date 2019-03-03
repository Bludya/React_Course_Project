const serverPath = 'http://localhost:9999';

function fetchData(path, method, data){
  return fetch(serverPath + path, {
    method,
    headers: {
      "Content-Type" : "application/json",
      "Authorization" : window.sessionStorage.token
    },
    body: JSON.stringify(data)
  }).then(res => res.json());
}

export const post = (path, data) => {
  return fetchData(path, 'POST', data);
}

export const get = (path) => {
  return fetchData(path, 'GET');
}

export const del = (path) => {
  return fetchData(path, 'DELETE');
}
