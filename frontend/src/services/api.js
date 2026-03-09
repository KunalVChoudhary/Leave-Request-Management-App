const API = import.meta.env.VITE_API_URL

export const loginUser = async (data) => {
  return fetch(`${API}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
}

export const registerUser = async (data) => {
  return fetch(`${API}/api/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
}

export const logoutUser = async () => {
  return fetch(`${API}/api/auth/logout`, {
    method: "POST",
    credentials: "include"
  })
}

export const checkAuth = async () => {
  return fetch(`${API}/api/auth/check`, {
    credentials: "include"
  })
}