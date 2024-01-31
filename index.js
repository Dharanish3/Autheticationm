import express from 'express'
import Router from './Source/Routes/web.js'
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT
const app = express()
app.use(express.json())

app.use('/',Router)


app.listen(port, () => {
    console.log(`App Listening on ${port}`)
})