import apiCLient from '../api/apiClient';

interface bodyType {
  name?: string;
  email: string;
  password: string;
}
export const registerUser = (body: bodyType) => {
  return apiCLient('/feeds/register', {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const loginUser = (body: bodyType) => {
  return apiCLient('/feeds/login', {
    method: 'POST',
    body: JSON.stringify(body),
  });
};


export const test = () => {
  return apiCLient('/feeds/test', {
    method: 'GET',
  });
};

