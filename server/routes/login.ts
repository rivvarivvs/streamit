import express, {Request, Response} from 'express'
import passport from 'passport'

const router = express.Router()

router.get('/',
    require('connect-ensure-login').ensureLoggedOut(),
    (req: Request, res: Response) => {
        res.render('login', {
            user: null,
            errors: {
                email: req.flash('email'),
                password: req.flash('password')
            }
        })
    })

router.post('/', passport.authenticate('localLogin', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

module.exports = router