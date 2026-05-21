const express = require("express")
const session = require("express-session")
const passport = require("passport")
const SteamStrategy = require("passport-steam").Strategy
const cors = require("cors")

const app = express()

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))

app.use(session({
  secret: "steam-secret",
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((obj, done) => {
  done(null, obj)
})

passport.use(
  new SteamStrategy(
    {
      returnURL: "http://localhost:3000/auth/steam/return",
      realm: "http://localhost:3000/",
      apiKey: "TWOJ_STEAM_API_KEY",
    },
    function(identifier, profile, done) {
      return done(null, profile)
    }
  )
)

app.get(
  "/auth/steam",
  passport.authenticate("steam")
)

app.get(
  "/auth/steam/return",
  passport.authenticate("steam", {
    failureRedirect: "/",
  }),
  function(req, res) {
    res.redirect("http://localhost:5173")
  }
)

app.listen(3000, () => {
  console.log("Steam backend działa")
})
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const lootboxes = {
    "Skiny CS2": [
        { name: "⚪ P250 | Sand Dune", weight: 700, tier: "tier-common" },
        { name: "🔵 AK-47 | Uncharted", weight: 200, tier: "tier-rare" },
        { name: "🟣 M4A4 | Tooth Fairy", weight: 80, tier: "tier-epic" },
        { name: "🟡 ★ KOSA | Karambit!", weight: 20, tier: "tier-legendary" }
    ],
    "Luksusowe Perfumy": [
        { name: "⚪ Próbka Zapachowa 2ml", weight: 650, tier: "tier-common" },
        { name: "🔵 Calvin Klein CK One", weight: 250, tier: "tier-rare" },
        { name: "🟣 Hugo Boss Bottled", weight: 85, tier: "tier-epic" },
        { name: "🟡 Chanel No. 5 Premium", weight: 15, tier: "tier-legendary" }
    ],
    "Elektronika": [
        { name: "⚪ Słuchawki douszne Basic", weight: 600, tier: "tier-common" },
        { name: "🔵 Powerbank 10000 mAh", weight: 280, tier: "tier-rare" },
        { name: "🟣 Klawiatura Mechaniczna RGB", weight: 100, tier: "tier-epic" },
        { name: "🟡 PlayStation 5 Slim", weight: 20, tier: "tier-legendary" }
    ]
};

app.post('/open-box', (req, res) => {
    const { caseName } = req.body;
    if (!lootboxes[caseName]) {
        return res.status(400).json({ success: false, message: "Nie znaleziono skrzynki" });
    }
    const currentBoxItems = lootboxes[caseName];
    const totalWeight = currentBoxItems.reduce((sum, item) => sum + item.weight, 0);
    const randomNumber = Math.floor(Math.random() * totalWeight) + 1;
    let currentSum = 0;
    let wonItem = null;
    for (const item of currentBoxItems) {
        currentSum += item.weight;
        if (randomNumber <= currentSum) {
            wonItem = item;
            break;
        }
    }
    res.json({ success: true, item: wonItem });
});

app.listen(PORT, () => console.log(`Serwer LOOTBOX śmiga pod adresem: http://localhost:${PORT}`));
