import { getLetterVariables } from './http_admin.js'

const letter_type = document.querySelector('#letter_type')
const var1 = document.querySelector('#var1')
const var2 = document.querySelector('#var2')
const date = document.querySelector('#date')
const btnDiv = document.querySelector('#btnDiv')
const getLetterVarBtn = document.querySelector('#getLetterVarBtn')
const postLetter = document.querySelector('#postLetter')

const letters = [
    '30th Day  - indicia removal - Singapore address',
    '30th Day  - indicia removal - Foreign address',
    '30th day Letter - Foreign address',
    '30th day Letter - Singapore address',
    '60th day Letter - Foreign address',
    '60th day Letter - Singapore address',
    'WB/W9 Reject letter',
    '90th Day  - US reclaraint Letter',
    'POA confirmation Letter',
    'Authorisation form rejection letter',
]
let l_no

let letter_vars = []

letters.map(letter => {
    let op = document.createElement('option')
    op.value = letter
    op.innerHTML = letter
    letter_type.appendChild(op)
})

const populateVariables = () => {
    btnDiv.classList.remove('hidden')

    letter_vars.forEach((lvar, index) => {
        const splitVars = lvar.variables.split(',')

        splitVars.map(letter => {
            if (l_no === 1 || l_no === 2 || l_no === 3) {
                date.classList.remove('hidden')
            }
            if (l_no === 3) {
                var1.classList.remove('hidden')
                var2.classList.remove('hidden')
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

postLetter.addEventListener('click', () => {
    window.location.href = '/checker/index.html'
})

getLetterVarBtn.addEventListener('click', async () => {
    if (letter_type.value !== 'default' && localStorage.getItem('a_id')) {
        let query = {
            a_id: JSON.parse(localStorage.getItem('a_id')),
            letter_name: letter_type.value,
        }
        l_no = letters.indexOf(letter_type.value) + 1
        localStorage.setItem('l_no', l_no)
        await getLetterVariables(query)

        letter_vars = JSON.parse(localStorage.getItem('letter_vars'))
        populateVariables()
    }
})
