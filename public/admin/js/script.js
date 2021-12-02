const title = document.querySelector('#title')

const client_id = localStorage.getItem('a_id')

if (client_id) {
    title.innerHTML = 'Welcome'
} else {
    title.innerHTML = 'Admin Portal'
}

title.addEventListener('click', () => {
    localStorage.removeItem('a_id')
    window.location.href = 'index.html'
})
