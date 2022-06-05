const getToken = () => {
    return localStorage.getItem('issue_tracker_token')
}

const setToken = (token) => {
    return localStorage.setItem('issue_tracker_token', token)
}

const clearToken = () => {
    return localStorage.removeItem('issue_tracker_token')
}

const token = {
    getToken,
    setToken,
    clearToken
}

export default token
