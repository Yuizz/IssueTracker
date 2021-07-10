
export function backendLink(endpoint='', key=null) {
    if (process.env.NODE_ENV !== 'production') {
        return `http://localhost:8000/api/v1/${endpoint}${key ? '/'+key : ''}/`
    }
    return `/api/v1/${endpoint}${key ? '/'+key : ''}/`
    // return "http://localhost:8000/" + endpoint + key ? "/" : '' + key
}
