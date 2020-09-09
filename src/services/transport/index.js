import axios from 'axios';
import qs from 'query-string';

import { handleError } from './failors';

export const transportService = async(path, options) => {
  const { origin, pathname } = new URL(path);
  let { search } = new URL(path);
  if (options.method && options.method.toUpperCase() === 'GET' && options.query) {
    const urlQueryString = qs.stringify(options.query);
    if (urlQueryString) {
      search = search ? `${search}&${urlQueryString}` : `?${urlQueryString}`;
    }
  }
  const url = `${origin}${pathname}${search}`;
  const defaultHeaders = !options.notJson
    ? {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    : {};

  return axios({
    url,
    method: options.method,
    headers: {
      ...defaultHeaders,
      ...options.headers
    },
    data: options.data || {}
  })
    .then(async response => response.data)
    .catch(async response => handleError(response));
};
