import $ from 'jquery'
import {GOREST_TOKEN} from "../secrets";

const id = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)
const url = `https://gorest.co.in/public/v1/posts/${id}`
const postEditForm = $('#post-edit-form')

const getData = async (id) => {
    return await fetch(`https://gorest.co.in/public/v1/posts?id=${id}`)
        .then(response => response.json())
        .catch(err => {
            console.error(err)
        })
}

const editPost = async (data = {}) => {
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

const renderForm = (data) => {
    postEditForm.append(
        `
            <div class="mb-3">
                <label class="form-label">Id: ${data.id}</label>
            </div>
            <div class="mb-3">
                <label class="form-label">User id: ${data.user_id}</label>
            </div>
            <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input type="text" class="form-control" id="title" value="${data.title}">
            </div>
            <div class="mb-3">
                <label for="post-body" class="form-label">Title</label>
                <textarea class="form-control" rows="6" id="post-body">${data.body}</textarea>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        `
    )
}

postEditForm.submit((event) => {
    event.preventDefault()

    const title = $(event.target).find("#title").val()
    const body = $(event.target).find("#post-body").val()
    const data = {
        body: body,
        title: title
    }
    editPost(data)
        .then((response) => {
            window.location.replace('/posts')
        })
})

getData(id).then(response => renderForm(response.data[0]))