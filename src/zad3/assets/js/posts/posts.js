import $ from 'jquery'
import api from "../api/api";
import {updatePagination} from "../../pagination/pagination";

const cards = $('#cards')
const pagination = $('#pagination')
const cardPostTemplate = $('#card-post-template').html()

const renderData = (post) => {
    const cardPost = $(cardPostTemplate)

    cardPost.find("h5[data-template='title']").text(post.title)
    cardPost.find("h6[data-template='ids']").text(`Id: ${post.id}, User id: ${post.user_id}`)
    cardPost.find("p[data-template='body']").text(post.body)
    cardPost.find("a[data-template='edit-button']").attr('href', `/posts/edit/${post.id}`)
    cards.append(cardPost)
}

const afterFetch = (response) => {
    cards.empty()
    response.data.forEach(renderData)
    updatePagination(response.meta.pagination)
}

pagination.bind('click', (event) => {
    event.preventDefault()
    const url = event.target.getAttribute('href')
    if (url === undefined) {
        return
    }
    api.getPosts(url)
        .then(afterFetch)
})

api.getPostsFirstPage()
    .then(afterFetch)
