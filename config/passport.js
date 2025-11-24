const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); 

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
        // Logic to verify or create the user
        try {
            let user = await User.findOne({ googleId: profile.id });

            if (user) {
                // User eist
                done(null, user);
            } else {
                // New User, creat it
                user = await User.create({
                googleId: profile.id,
                displayName: profile.displayName,
                email: profile.emails[0].value, // probably asked the email
                });
                done(null, user);
            }
        } catch (err) {
            console.error(err);
            done(err, null);
        }
    })
);

// Only save usrID over session
passport.serializeUser((user, done) => {
        done(null, user.id);
    });

// use the usrID to fid the complete user every session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;