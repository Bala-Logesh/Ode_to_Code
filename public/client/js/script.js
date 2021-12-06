const title = document.querySelector('#title')

const client_id = localStorage.getItem('client_id')

if (client_id) {
    title.innerHTML = 'Welcome'
} else {
    title.innerHTML = 'Customer Portal'
}

title.addEventListener('click', () => {
    localStorage.removeItem('client_id')
    localStorage.removeItem('queries')
    localStorage.removeItem('customer')
    window.location.href = 'index.html'
})
