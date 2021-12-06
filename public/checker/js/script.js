import {
    httpStep1,
    httpStep2,
    httpStep3,
    httpStep4,
    httpStep5,
    getStatus,
    generateLetter,
} from './http_checker.js'

const step1 = document.querySelector('#step1')
const step2 = document.querySelector('#step2')
const step3 = document.querySelector('#step3')
const step4 = document.querySelector('#step4')
const step5 = document.querySelector('#step5')
const refresh = document.querySelector('#refresh')
const generate = document.querySelector('#generate')
const title = document.querySelector('#title')

title.addEventListener('click', () => {
    localStorage.removeItem('Checking')
    localStorage.removeItem('refreshed')
    window.location.href = 'index.html'
})


const getValsFromLS = () => {
    return {
        c_id: localStorage.getItem('client_id'),
        a_id: localStorage.getItem('a_id'),
        l_id: localStorage.getItem('l_no'),
        t_id: localStorage.getItem('t_id'),
    }
}

const performStep1 = async () => {
    const s1 = getValsFromLS()

    await httpStep1(s1)
    setTimeout(() => {
        if (localStorage.getItem('Checking') === 'true') {
            step1.innerHTML = 'Completed'
            performStep2()
        }
    }, 2000)
}

const performStep2 = async () => {
    const s2 = getValsFromLS()

    await httpStep2(s2)
    setTimeout(() => {
        if (localStorage.getItem('Checking') === 'true') {
            step2.innerHTML = 'Completed'
            performStep3()
        }
    }, 2000)
}

const performStep3 = async () => {
    const s3 = getValsFromLS()

    await httpStep3(s3)
    setTimeout(() => {
        if (localStorage.getItem('Checking') === 'true') {
            step3.innerHTML = 'Completed'
            performStep4()
        }
    }, 2000)
}

const performStep4 = async () => {
    const customer = JSON.parse(localStorage.getItem('customer_a'))[0]
    const s4 = {
        firstname: customer.firstname,
        lastname: customer.lastname,
        address: customer.address,
        nationality: customer.nationality,
        phone_no: customer.phone_no,
    }

    await httpStep4(s4)
    setTimeout(() => {
        if (localStorage.getItem('Checking') === 'true') {
            step4.innerHTML = 'Completed'
            performStep5()
        }
    }, 2000)
}

const performStep5 = async () => {
    const s5 = getValsFromLS()

    setTimeout(() => {
        step5.innerHTML = 'Pending Approval'
    }, 3000)
    await httpStep5(s5)
}

// performStep1()

generate.addEventListener('click', async () => {
    let payload = {
        l_id: localStorage.getItem('l_no'),
        c_id: localStorage.getItem('client_id'),
        l_var: localStorage.getItem('l_var'),
        t_id: localStorage.getItem('t_id'),
    }
    await generateLetter(payload)
})

refresh.addEventListener('click', async () => {
    await getStatus({
        t_id: localStorage.getItem('t_id'),
    })

    if (localStorage.getItem('refreshed') === 'Approved') {
        step5.innerHTML = 'Approved'
        generate.classList.remove('hidden')
    } else if (localStorage.getItem('refreshed') === 'Rejected') {
        step5.innerHTML = 'Rejected'
    } else {
        step5.innerHTML = 'Approval Pending'
    }
})
