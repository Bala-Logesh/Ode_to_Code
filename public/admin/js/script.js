const title = document.querySelector('#title')

const client_id = localStorage.getItem('a_id')

if (client_id) {
    title.innerHTML = 'Welcome'
} else {
    title.innerHTML = 'Admin Portal'
}

title.addEventListener('click', () => {
    localStorage.removeItem('a_id')
    localStorage.removeItem('l_var')
    localStorage.removeItem('l_no')
    localStorage.removeItem('letter_vars')
    localStorage.removeItem('customer_a')
    localStorage.removeItem('t_id')
    window.location.href = 'index.html'
})
