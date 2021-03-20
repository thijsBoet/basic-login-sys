const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const passport = require("passport");


initialize = (password, getUserByEmail) => {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email);
    if (user === null) {
      return done(null, false, {message: "No user with that email"})
    }

    try {
      if (await bcrypt.compare(password, user.passport)) {
        return done(null, user)
      } else {
        return done(null, false, {message: "Password incorrect"})
      }
    } catch (error) {
      return done(e)
    }
  }
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null,user.id))
  passport.deserializeUser((id, done) => done(null, getUserById(id)))
}

module.exports = initialize