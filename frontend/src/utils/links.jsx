export function backendLink(endpoint='', params=null) {
    const backend = 'http://localhost:8000/'
    return `${backend}${endpoint}/${params ? params : ''}`
}