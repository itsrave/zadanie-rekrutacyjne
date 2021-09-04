import {GOREST_TOKEN} from "../secrets";

const USERS_URL = 'https://gorest.co.in/public/v1/users'
const POSTS_URL = 'https://gorest.co.in/public/v1/posts'

const getUsers = (url) => {
    return _getRequest(url)
}

const getUsersByName = (name) => {
    return _getRequest(`${USERS_URL}?name=${name}`)
}

const getUsersFirstPage = () => {
    return _getRequest(USERS_URL)
}

const getPosts = (url) => {
    return _getRequest(url)
}

const getSinglePost = (id) => {
    return _getRequest(`${POSTS_URL}?id=${id}`).then(response => response.data[0])
}

const getPostsFirstPage = () => {
    return _getRequest(POSTS_URL)
}

const editPost = (id, data) => {
    return _patchRequest(`${POSTS_URL}/${id}`, data)
}

const _getRequest = async (url) => {
    return await fetch(url)
        .then(response => response.json())
        .catch(err => {
            console.error(err)
        })
}

const _patchRequest = async (url, data) => {
    return await fetch(url, {
        method: 'PATCH',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GOREST_TOKEN}`,
        },
        body: JSON.stringify(data)
    })
        .catch(err => console.error(err))
}

const api = {
    getUsers: getUsers,
    getUsersByName: getUsersByName,
    getUsersFirstPage: getUsersFirstPage,
    getPosts: getPosts,
    getPostsFirstPage: getPostsFirstPage,
    getSinglePost: getSinglePost,
    editPost: editPost
}

export default api