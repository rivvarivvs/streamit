import express from 'express'
import Session from 'express-session'
import bodyParse from 'body-parser'
import mongoose from 'mongoose'
import middleware from 'connect-ensure-login'
const FileStore = require('session-file-store')(Session)
import flash from 'connect-flash'
import path from 'path'
import { config } from './config/default'

const {passport} = require('./service/passport') // to do   

const port = 3333
const app = express()

// mongoose connect
mongoose.connect('mongodb://', {
    useNewUrlParser: true
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))
app.use(express.static('public'))
app.use(require('cookie-parser'))
app.use(bodyParse.urlencoded({extended: true}))
app.use(bodyParse.json())
app.use(passport.initialize())
app.use(passport.session())

app.use(FileStore({
    store: new FileStore({
        path: './server/sessions'
    }),
    secret: config.server.secret,
    maxAge : Date.now() + (60 * 1000 * 30)
}))

app.listen(port, () => console.log(`Listening on port ${port}`))