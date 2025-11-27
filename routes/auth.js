const router = require('express').Router(); 
const passport = require('passport');

// 1 Route to start the initial sing up to Google
router.get('/google',
  /* #swagger.tags = ['Auth - Google OAuth']
    #swagger.summary = 'Begin auth with Google (OAuth 2.0)'
    #swagger.description = 'consent by User redirection.'
    #swagger.security = [{"googleOAuth": ["profile", "email"]}] 
    */
  passport.authenticate('google', {
    scope: ['profile', 'email'] // Ask the onfo needed
  })
);

// 2. Callback will be equal with the Google Console setting
router.get('/google/callback',
  /* #swagger.tags = ['Auth - Google OAuth']
    #swagger.summary = 'Maneja el callback de Google'
    #swagger.ignore = true // Ocultar esta ruta, ya que solo la usa Google
    */
  passport.authenticate('google', {
    failureRedirect: '/fail-login' // Redirection on fail case
  }),
  (req, res) => {
    // Redirection if login success
    res.redirect('/dashboard');
  }
);

// 3. Rpute to close session
router.get('/logout', (req, res, next) => {
  /* #swagger.tags = ['Auth - Google OAuth']
    #swagger.summary = 'Cerrar sesión'
    #swagger.description = 'Cierra la sesión del usuario (destruye la sesión de Express) y redirige a la página principal.'
    #swagger.responses[200] = { description: 'Redirecciona a /' }
    */
  req.logout((err) => {
    if (err) { return next(err); }
    
    req.session.destroy( (err) => {
      if (err) {
        console.error('Error destruction error: ', err);
      }
      res.redirect('/');
    });
  });
});

module.exports = router;