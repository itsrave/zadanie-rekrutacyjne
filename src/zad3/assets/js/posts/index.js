import $ from 'jquery'

const url = 'https://gorest.co.in/public/v1/posts'
const cards = $('#cards')
const pagination = $('#pagination')


const getData = async (url) => {
    fetch(url)
        .then(response => response.json())
        .then(response => {
            cards.empty()
            response.data.forEach(renderData)
            pagination.empty()
            renderPagination(response.meta.pagination)
        })
        .catch(err => {
            console.error(err)
        })
}

const renderData = (post) => {
    cards.append(
        `
            <div class="card col">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Id: ${post.id}, User id: ${post.user_id}</h6>
                    <p class="card-text">${post.body}</p>
                    <a href="/posts/edit/${post.id}" class="card-link">Edit</a>
                </div>
            </div>
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

getData(url)
