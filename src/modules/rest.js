const BASE_URL = 'https://pong-api.herokuapp.com/';

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

export default { post };
