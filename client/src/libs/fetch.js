import config from '@config'

// TODO: Add authentication management
export const makeFetch = async (basePath, { defaultHeaders = {} }) => {
  basePath = `${config.apiPath}${basePath}`
  return (path, { headers = {}, body, ...options }) => {
    options.headers = { ...defaultHeaders, ...headers}
    if (body) {
      options.body = JSON.stringify(body)
      options.headers['Content-Type'] = 'application/json'
    }
    return fetch(`${basePath}${path}`, options).then(res => res.json())
  }
}
