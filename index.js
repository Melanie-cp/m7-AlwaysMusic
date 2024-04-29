import 'dotenv/config'
import express from 'express'
import studentRoutes from './routes/student.route.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/students', studentRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log('Servidor andando en el puerto', PORT))