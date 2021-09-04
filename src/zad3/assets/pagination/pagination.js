import $ from "jquery";

export const updatePagination = (paginationData) => {
    $('#previous-li').removeClass().toggleClass(paginationData.links.previous ? 'page-item' : 'page-item disabled')
    $('#next-li').removeClass().toggleClass(paginationData.links.next ? 'page-item' : 'page-item disabled')
    $('#previous-a').attr('href', paginationData.links.previous || '#')
    $('#next-a').attr('href', paginationData.links.next || '#')
}