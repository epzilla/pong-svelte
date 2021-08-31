import { BASE_URL } from './constants';

const get = async (url, body) => {
  const res = await fetch(`${BASE_URL}${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();
  return data;
};

const post = async (url, body) => {
  const res = await fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  return data;
};

const put = async (url, data) => {
  if (data && !data.deviceId) {
    let dev = deviceId;
    if (!dev) {
      dev = LocalStorageService.get('device-id');
      deviceId = dev;
    }
    data.deviceId = dev;
  }
  const res = fetch(`${BASE_URL}${url}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  const json = await res.json();
  return json;
};

export default { get, post, put };
