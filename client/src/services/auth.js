const serverPath = 'http://localhost:9999';

export const login = async (data) => {
    return await fetch(serverPath + '/auth/login',{
      method: 'POST',
      headers: {
            "Content-Type": "application/json"
        },
      body: JSON.stringify(data)
    }).then(res => res.json());
  }

export const register = async (data) => {
    return await fetch(serverPath + '/auth/register',{
      method: 'POST',
      headers: {
            "Content-Type": "application/json"
        },
      body: JSON.stringify(data)
    }).then(res => res.json());
  }
