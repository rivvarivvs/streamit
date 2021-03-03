import passport from 'passport'
import { Request } from 'express'
import nanoid from 'nanoid'
import { User } from '../models/User'
import flash from 'connect-flash'

const LocalStrategy = require('passport-local').LocalStrategy

passport.serializeUser((user, cb) => {
    cb(null, user)
})

passport.deserializeUser((obj, cb) => {
    cb(null, obj)
})

// passport strategy
passport.use('localRegister', new LocalStrategy({
    username: 'email',
    password: 'password',
    passReqToCallback: true
}, async (req: Request, email, password, done) => {
    const existingUser = await User.findOne({ $or: [{email: email}, {username: req.body.username}]})

    if (existingUser) {
        return existingUser.email === email? req.flash('email', 'Email is being taken') : req.flash('username', 'Username is already taken')
    }

    
}
))

