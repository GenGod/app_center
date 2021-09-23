import fetch from 'node-fetch';
import { headers } from '../heplers/urlHelper.mjs';

const makeRequest = async (url, method = 'GET', body = undefined) => {
    const response = await fetch(url, {
        method,
        headers: body ? { ...headers, 'Content-Type': 'application/json' } : headers,
        body: body ? JSON.stringify(body) : body,
    });
    const json = await response.json();
    return json;
}

export default makeRequest;
