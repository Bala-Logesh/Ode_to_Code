const title = document.querySelector('#title')

const client_id = localStorage.getItem('m_id')

if (client_id) {
    title.innerHTML = 'Welcome'
} else {
    title.innerHTML = 'Manager Portal'
}

title.addEventListener('click', () => {
    localStorage.removeItem('m_id')
    localStorage.removeItem('tickets_m')
    localStorage.removeItem('Approval')
    localStorage.removeItem('Approved')
    localStorage.removeItem('Rejected')
    window.location.href = 'index.html'
})
