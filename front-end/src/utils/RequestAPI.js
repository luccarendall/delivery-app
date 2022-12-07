import axios from 'axios';

const HOST = process.env.REACT_APP_API_HOST || 'localhost:3001';
const PROTOCOL = process.env.REACT_APP_API_PROTOCOL || 'http';

const request = axios.create({
  baseURL: `${PROTOCOL}://${HOST}/`,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const requestApi = async (
  method,
  endpoint,
  body,
  headers,
) => request
  .request({ method, url: endpoint, data: body, headers })
  .then(({ status, data }) => ({ status, data }))
  .catch((error) => error.response);

export default requestApi;
