const DiscordStrategy = require("passport-discord").Strategy;
const passport = require("passport");
const path = require("path");
const error = require(path.join(__dirname, "../modules/error/error"));

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        if (user) {
            done(null, user);
        }
    } catch (err) {
        error.error(1, err);
    }
});
try {
    passport.use(
        new DiscordStrategy(
            {
                clientID: process.env.DISCORD_ID,
                clientSecret: process.env.DISCORD_SECRET,
                callbackURL: process.env.DISCORD_REDIRECT,
                scope: ["identify", "guilds"],
            },
            async (accessToken, refreshToken, profile, done) => {
                console.log(`${general.time}${profile}`);
            }
        )
    );
} catch (err) {
    error.error(1, err);
    done(err, null);
}
