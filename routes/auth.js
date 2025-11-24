const router = require('express').Router(); 
const passport = require('passport');

// 1 Route to start the initial sing up to Google
router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'] // Ask the onfo needed
  })
);

// 2. Callback will be equal with the Google Console setting
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login-fallido' // Redirection on fail case
  }),
  (req, res) => {
    // Redirection if success was success
    res.redirect('/dashboard');
  }
);

// 3. Rpute to close session
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
})

module.exports = router;