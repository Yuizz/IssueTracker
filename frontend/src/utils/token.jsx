const getToken = () => {
    return localStorage.getItem('issue_tracker_token')
}

const setToken = (token) => {
    return localStorage.setItem('issue_tracker_token', token)
}

const token = {
    getToken,
    setToken
}

export default token