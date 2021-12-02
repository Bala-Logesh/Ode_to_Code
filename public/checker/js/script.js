import {
    httpStep1,
    httpStep2,
    httpStep3,
    httpStep4,
    httpStep5,
    getStatus,
    downloadPDF,
} from './http_checker.js'

const step1 = document.querySelector('#step1')
const step2 = document.querySelector('#step2')
const step3 = document.querySelector('#step3')
const step4 = document.querySelector('#step4')
const step5 = document.querySelector('#step5')
const refresh = document.querySelector('#refresh')
const download = document.querySelector('#download')

const performStep1 = async () => {
    const s1 = {
        c_id: localStorage.getItem('client_id'),
        a_id: localStorage.getItem('a_id'),
        l_id: localStorage.getItem('l_id'),
    }

    await httpStep1(s1)
    setTimeout(() => {
        step1.innerHTML = 'Completed'
        performStep2()
    }, 3000)
}

const performStep2 = async () => {
    const s2 = {
        c_id: localStorage.getItem('client_id'),
        a_id: localStorage.getItem('a_id'),
        l_id: localStorage.getItem('l_id'),
    }

    await httpStep2(s2)
    setTimeout(() => {
        step2.innerHTML = 'Completed'
        performStep3()
    }, 3000)
}

const performStep3 = async () => {
    const s3 = {
        c_id: localStorage.getItem('client_id'),
        a_id: localStorage.getItem('a_id'),
        l_id: localStorage.getItem('l_id'),
    }

    await httpStep3(s3)
    setTimeout(() => {
        step3.innerHTML = 'Completed'
        performStep4()
    }, 3000)
}

const performStep4 = async () => {
    const custiomer = JSON.parse(localStorage.getItem('customer_a'))
    const s4 = {
        firstname: custiomer.firstname,
        lastname: custiomer.lastname,
        address: custiomer.address,
        nationality: custiomer.nationality,
        phone_no: custiomer.phone_no,
    }

    await httpStep4(s4)
    setTimeout(() => {
        step4.innerHTML = 'Completed'
        performStep5()
    }, 3000)
}

const performStep5 = async () => {
    const custiomer = JSON.parse(localStorage.getItem('customer_a'))
    const s5 = {
        c_id: localStorage.getItem('client_id'),
        a_id: localStorage.getItem('a_id'),
        l_id: localStorage.getItem('l_id'),
    }

    setTimeout(() => {
        step5.innerHTML = 'Pending Approval'
    }, 3000)
    await httpStep5(s5)
}

performStep1()

download.addEventListener('click', async () => {
    await downloadPDF({
        fileName: `${localStorage.getItem('t_id')}.pdf`,
    })
})

refresh.addEventListener('click', async () => {
    await getStatus({
        t_id: localStorage.getItem('t_id'),
    })

    if (localStorage.getItem('refreshed') === 'Approved') {
        step5.innerHTML = 'Approved'
    } else if (localStorage.getItem('refreshed') === 'Rejected') {
        step5.innerHTML = 'Rejected'
    } else {
        step5.innerHTML = 'Approval Pending'
    }
})
