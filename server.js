import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import admin from './routes/admin.js'
import checker from './routes/checker.js'
import client from './routes/client.js'
import manager from './routes/manager.js'
import letter from './routes/letter.js'
dotenv.config()

const app = express()

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Successfully connected to the database')
    })
    .catch(err => {
        console.log('MongoDB connection error: ', err)
    })

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
app.use('/manager', manager)
app.use('/letter', letter)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/test', (req, res) => {
    res.send({ data: 'Server is up and running' })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
