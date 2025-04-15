require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes/routes");
const passport = require("passport");
const session = require("express-session");

const LocalStrategy = require("passport-local").Strategy;
const pool = require("./db/pool");
const bcrypt = require("bcryptjs");

app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    store: new (require("connect-pg-simple")(session))({
      pool: pool,
      // can remove once table is created
      createTableIfMissing: true,
    }),
  })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        `SELECT * FROM users WHERE username= $1;`,
        [username]
      );
      const user = rows[0];
      const match = await bcrypt.compare(password, user.password);

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM users WHERE user_id = $1;`,
      [id]
    );
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use("/", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening: ${PORT}`));
