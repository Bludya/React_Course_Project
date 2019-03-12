import {get, post, put} from './crud';

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
  return put('/auth/ban/' + id, banState);
}

export const makeAdminService = (id) => {
  return put('/auth/make-admin/');
}
