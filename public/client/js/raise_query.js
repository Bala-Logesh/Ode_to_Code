import { raiseQuery } from './http_client.js'

const letter_type = document.querySelector('#letter_type')
const desc = document.querySelector('#desc')
const subQueryBtn = document.querySelector('#subQueryBtn')

const letters = [
    'FATCA',
    'Power of Attorney',
    'Demo Maintenance',
    'Citi Biz Ac/Closure',
    'MPP - Citibiz',
]

letters.map(letter => {
    let op = document.createElement('option')
    op.value = letter
    op.innerHTML = letter
    letter_type.appendChild(op)
})

subQueryBtn.addEventListener('click', async () => {
    if (letter_type.value !== 'default' && localStorage.getItem('client_id')) {
        let query = {
            c_id: JSON.parse(localStorage.getItem('client_id')),
            query: letter_type.value,
            desc: desc.value,
        }
        await raiseQuery(query)
        let queries = JSON.parse(localStorage.getItem('queries')) || []
        queries.push(query)
        localStorage.setItem('queries', JSON.stringify(queries))
        window.location.href = 'track_query.html'
    }
})
