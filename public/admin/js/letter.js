import { getLetterVariables } from './http_admin.js'

const letter_type = document.querySelector('#letter_type')
const letVarsContainer = document.querySelector('#let_vars_container')
const var1 = document.querySelector('#var1')
const var2 = document.querySelector('#var2')
const var3 = document.querySelector('#var3')
const date = document.querySelector('#date')
const btnDiv = document.querySelector('#btnDiv')
const getLetterVarBtn = document.querySelector('#getLetterVarBtn')

const letters = [
    'FATCA',
    'Power of Attorney',
    'Demo Maintenance',
    'Citi Biz Ac/Closure',
    'MPP - Citibiz',
]

let letter_vars = []

letters.map(letter => {
    let op = document.createElement('option')
    op.value = letter
    op.innerHTML = letter
    letter_type.appendChild(op)
})

const populateVariables = () => {
    var1.classList.remove('hidden')
    var2.classList.remove('hidden')
    var3.classList.remove('hidden')
    date.classList.remove('hidden')
    btnDiv.classList.remove('hidden')

    letter_vars.forEach((lvar, index) => {
        lvar.variables.split(',').map(letter => {
            if (letter === 'Embed Date') {
                var3.classList.add('hidden')
                date.classList.remove('hidden')
            } else {
                let op = document.createElement('option')
                op.value = letter
                op.innerHTML = letter
                if (index == 0) {
                    var1.appendChild(op)
                } else if (index == 1) {
                    var2.appendChild(op)
                }
            }
        })
    })
}

getLetterVarBtn.addEventListener('click', async () => {
    if (letter_type.value !== 'default' && localStorage.getItem('a_id')) {
        let query = {
            a_id: JSON.parse(localStorage.getItem('a_id')),
            letter_name: letter_type.value,
        }
        await getLetterVariables(query)

        letter_vars = JSON.parse(localStorage.getItem('letter_vars'))
        populateVariables()
    }
})
