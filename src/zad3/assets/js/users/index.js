import $ from 'jquery'

const url = 'https://gorest.co.in/public/v1/users'
const usersTable = $('#users-table')
const pagination = $('#pagination')
const searchForm = $('#search-form')


const getData = async (url) => {
    fetch(url)
        .then(response => response.json())
        .then(response => {
            usersTable.empty()
            response.data.forEach(renderData)
            pagination.empty()
            renderPagination(response.meta.pagination)
        })
        .catch(err => {
            console.error(err)
        })
}

const renderData = (user) => {
    usersTable.append(
        `
            <tr>
                <th scope="row">${user.id}</th>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.gender}</td>
                <td>${user.status}</td>
            </tr>
        `
    )
}

const renderPagination = (paginationData) => {
    pagination.append(
        `
            <li class="page-item ${paginationData.links.previous ? '' : 'disabled'}">
                <a class="page-link" href="${paginationData.links.previous || '#'}" tabindex="-1" aria-disabled="true">Previous</a>
            </li>
            <li class="page-item ${paginationData.links.next ? '' : 'disabled'}">
                <a class="page-link" href="${paginationData.links.next || '#'}">Next</a>
            </li>
        `
    )
}

pagination.bind('click', (event) => {
    event.preventDefault()
    const link = event.target.getAttribute('href')
    if (link === undefined) {
        return
    }
    getData(link)
})

searchForm.submit((event) => {
    event.preventDefault()
    const searchString = $(event.target).find("input").val()
    getData(url + `?name=${searchString}`)
    if (searchString === '') {
        getData(url)
    }
})



getData(url)
