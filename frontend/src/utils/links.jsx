
export function backendLink(endpoint='', key=null) {
    return `http://localhost:8000/api/v1/${endpoint}${key ? '/'+key : ''}`
    // return "http://localhost:8000/" + endpoint + key ? "/" : '' + key
}