
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let users = [
  {
    id: 1,
    username: "admin",
    balance: 1000
  }
];

let logs = [];

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/logs", (req, res) => {
  res.json(logs);
});

app.post("/api/add-balance", (req, res) => {
  const { userId, amount } = req.body;

  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  user.balance += amount;

  logs.push({
    action: "BALANCE_ADDED",
    amount,
    userId,
    createdAt: new Date()
  });

  res.json(user);
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
