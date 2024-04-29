import express from 'express'
import studentRoutes from './routes/student.route.js'

const app = express()

app.use('/', studentRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log('Servidor andando en el puerto', PORT))