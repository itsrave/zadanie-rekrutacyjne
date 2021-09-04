import $ from 'jquery'
import api from "../api/api";
import {updatePagination} from "../../pagination/pagination";

const usersTable = $('#users-table')
const pagination = $('#pagination')
const searchForm = $('#search-form')
const userRowTemplate = $('#user-row-template').html()

const renderData = (user) => {
    const row = $(userRowTemplate)

    row.find("th[data-template='id']").text(user.id)
    row.find("td[data-template='name']").text(user.name)
    row.find("td[data-template='email']").text(user.email)
    row.find("td[data-template='gender']").text(user.gender)
    row.find("td[data-template='status']").text(user.status)

    usersTable.append(row)
}

const afterFetch = (response) => {
    usersTable.empty()
    response.data.forEach(renderData)
    updatePagination(response.meta.pagination)
}

pagination.bind('click', (event) => {
    event.preventDefault()
    const url = event.target.getAttribute('href')
    if (url === undefined) {
        return
    }
    api.getUsers(url)
        .then(afterFetch)
})

searchForm.submit((event) => {
    event.preventDefault()
    const name = $(event.target).find("input").val()
    api.getUsersByName(name)
        .then(afterFetch)
    if (name === '') {
        api.getUsersFirstPage()
            .then(afterFetch)
    }
})

api.getUsersFirstPage()
    .then(afterFetch)
