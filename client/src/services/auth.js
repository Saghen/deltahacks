import { makeFetch } from '@libs/fetch'

const fetchAuth = makeFetch('/auth')

export async function signUp() {
  // Do some validation on the username and password
  return fetchAuth('/sign-up', { method: 'post', body: { username, password } })
}

export async function login({ username, password }) {
  // Do some validation on the username and password
  return fetchAuth('/login', { method: 'post', body: { username, password } })
}

export async function logout() {
  return fetchAuth('/logout')
}
