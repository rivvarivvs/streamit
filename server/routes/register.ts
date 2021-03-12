import express, {Request, Response} from 'express'
import passport from 'passport'

const router = express.Router()

router.get('/', 
    require('connect-ensure-login').ensureLoggedOut(),
    (req: Request, res: Response) => {
        res.render('register', {
            user: null,
            errors: {
                username: req.flash('username'),
                email: req.flash('email')
            }
        })
    })

router.post('/', 
    require('connect-ensure-login').ensureLoggedOut(), 
    passport.authenticate('localRegister', {
        successRedirect: '/',
        failureRedirect: '/register',
        failureFlash: true
    })
)

module.exports = router;