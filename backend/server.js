require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const SteamStrategy = require("passport-steam");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: "lootbox-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new SteamStrategy.Strategy(
    {
      returnURL:
        "http://localhost:3000/auth/steam/return",

      realm: "http://localhost:3000/",

      apiKey: process.env.STEAM_API_KEY,
    },

    function (identifier, profile, done) {
      process.nextTick(function () {
        profile.identifier = identifier;

        return done(null, profile);
      });
    }
  )
);

app.get(
  "/auth/steam",

  passport.authenticate("steam", {
    failureRedirect: "/",
  }),

  function (req, res) {
    res.redirect("/");
  }
);

app.get(
  "/auth/steam/return",

  passport.authenticate("steam", {
    failureRedirect: "/",
  }),

  function (req, res) {
    res.redirect("http://localhost:5173");
  }
);

app.get("/api/user", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.json(null);
  }
});

app.listen(3000, () => {
  console.log(
    "Steam auth server działa na porcie 3000"
  );
});