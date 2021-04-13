export const getToken = () => {
    return localStorage.getItem('issue_tracker_token')
}

export const setToken = (token) => {
    return localStorage.setItem('issue_tracker_token', token)
}