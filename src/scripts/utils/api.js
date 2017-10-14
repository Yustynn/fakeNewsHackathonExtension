const API_URL = 'https://tzewhen.azurewebsites.net/api'

export async function get(endpoint) {
  const res = await fetch(API_URL + endpoint)
  return await res.json()
}

export async function post(endpoint, obj = {}) {
  const body = JSON.stringify(obj);

  const res = await fetch(API_URL + endpoint, {
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    method: 'post',
    body
  })

  return res.json();
}

