import {get, post, put} from './crud';
const {safe_tags} = require('./defensiveFunctions');

export const login = async (data) => {
  return post('/auth/login', data);
}

export const register = async (data) => {
  return post('/auth/register', data);
}

export const getUsersService = () => {
  return get('/auth/get-users');
}

export const userBanService = (id, banState) => {
  id = safe_tags(id);
  banState = safe_tags(banState);
  return put('/auth/ban/' + id, {banState: banState});
}

export const makeAdminService = (id) => {
  id = safe_tags(id);
  return put('/auth/make-admin/' + id);
}

export const getUsersByUsernameService = (username) => {
  username = safe_tags(username)
  return get('/auth/get-by-username?searchString=' + username);
}
