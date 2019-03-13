const {safe_tags} = require('./defensiveFunctions');
const serverPath = 'http://localhost:9999';

function fetchData(path, method, data){
  for(let key in data){
    let text = data[key];
    if(typeof(text) === 'string'){
      data[key] = safe_tags(data[key]);
    }
  }

  return fetch(serverPath + path, {
    method,
    headers: {
      "Content-Type" : "application/json",
      "Authorization" : safe_tags(window.sessionStorage.token)
    },
    body: JSON.stringify(data)
  }).then(res => res.json());
}

export const post = (path, data) => {
  return fetchData(path, 'POST', data);
}

export const get = (path, params) => {
  return fetchData(path, 'GET');
}

export const put = (path, data) => {
  console.log(data);
  return fetchData(path, 'PUT', data);
}

export const del = (path) => {
  return fetchData(path, 'DELETE');
}
