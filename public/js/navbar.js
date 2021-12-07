const navbar = document.getElementById('navbar')
const page = navbar.getAttribute('data-page')
let title

const clientReset = () => {
    localStorage.removeItem('client_id')
    localStorage.removeItem('queries')
    localStorage.removeItem('customer')
    window.location.href = '/client/index.html'
}

const checkerReset = () => {
    localStorage.removeItem('Checking')
    localStorage.removeItem('refreshed')
    window.location.href = '/checker/index.html'
}

const managerReset = () => {
    localStorage.removeItem('m_id')
    localStorage.removeItem('tickets_m')
    localStorage.removeItem('Approval')
    localStorage.removeItem('Approved')
    localStorage.removeItem('Rejected')
    window.location.href = '/manager/index.html'
}

const adminReset = () => {
    localStorage.removeItem('a_id')
    localStorage.removeItem('l_var')
    localStorage.removeItem('l_no')
    localStorage.removeItem('letter_vars')
    localStorage.removeItem('customer_a')
    localStorage.removeItem('t_id')
    window.location.href = '/admin/index.html'
}

if (page === 'main') {
    title = `<h3 class='title'>Main Static Navigation</h3>`
} else if (page === 'client') {
    const client_id = localStorage.getItem('client_id')
    title = `<h3 class='title pointer' onClick="clientReset()">${
        client_id ? 'Welcome' : 'Customer Portal'
    }</h3>`
} else if (page === 'checker') {
    title = `<h3 class='title pointer' onClick="checkerReset()">Checker Page</h3>`
} else if (page === 'manager') {
    const m_id = localStorage.getItem('m_id')
    title = `<h3 class='title pointer' onClick="managerReset()">${
        m_id ? 'Welcome' : 'Manager Portal'
    }</h3>`
} else if (page === 'admin') {
    const a_id = localStorage.getItem('a_id')
    title = `<h3 class='title pointer' onClick="adminReset()">${
        a_id ? 'Welcome' : 'Admin Portal'
    }</h3>`
}

navbar.innerHTML = `
    <div class='nav-container'>
        <nav class='navbar flex-jcsb'>
            <a href='/index.html'>
                <img class='logo' src='../images/citi.png' alt='Citi Logo' />
            </a>
            ${title}
        </nav>
    </div>
`
