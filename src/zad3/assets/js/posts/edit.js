import $ from 'jquery'
import api from "../api/api";

const id = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)
const postEditForm = $('#post-edit-form')
const postEditFormTemplate = $('#post-edit-form-template').html()

const renderForm = (data) => {
    const postEditFormContents = $(postEditFormTemplate)

    postEditFormContents.find("label[data-template='id']").text(data.id)
    postEditFormContents.find("label[data-template='user-id']").text(data.user_id)
    postEditFormContents.find("input[data-template='title']").value(data.title)
    postEditFormContents.find("textarea[data-template='body']").value(data.body)

    postEditForm.append(postEditFormContents)
}

postEditForm.submit((event) => {
    event.preventDefault()

    const title = $(event.target).find("#title").val()
    const body = $(event.target).find("#post-body").val()
    const data = {
        body: body,
        title: title
    }
    api.editPost(id, data)
        .then(response => window.location.replace('/posts'))
})

api.getSinglePost(id)
    .then(renderForm)
