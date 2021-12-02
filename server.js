import express from 'express'
import path from 'path'
import admin from './routes/admin.js'
import checker from './routes/checker.js'
import client from './routes/client.js'

const app = express()

const __dirname = path.resolve()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*'])
    res.append('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')
    res.append('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.use('/admin', admin)
app.use('/checker', checker)
app.use('/client', client)

app.get('/test', (req, res) => {
    console.log('Invoked')
    res.send({ data: 'Server is up and running' })
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const PORT = 3000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
