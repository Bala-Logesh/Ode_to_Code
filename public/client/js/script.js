const title = document.querySelector('#title')

const client_id = localStorage.getItem('client_id')

if (client_id) {
    title.innerHTML = 'Welcome'
} else {
    title.innerHTML = 'Customer Portal'
}

title.addEventListener('click', () => {
    localStorage.removeItem('client_id')
    window.location.href = 'index.html'
})
