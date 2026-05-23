import "./App.css";

import { useEffect, useState } from "react";

function App() {
  const [balance, setBalance] = useState(11960);

  const [inventory, setInventory] = useState([]);

  const [reward, setReward] = useState(null);

  const [opening, setOpening] = useState(false);

  const [loading, setLoading] = useState(true);

  const liveDrops = [
    "🔥 kuba123 wygrał iPhone 15 Pro",
    "🔥 sniper wygrał AWP Dragon Lore",
    "🔥 adam777 wygrał Rolex",
    "🔥 mati wygrał Mercedes AMG",
    "🔥 player1337 wygrał PlayStation 5",
  ];

  const rewards = [
    {
      name: "AWP Dragon Lore",
      value: 4500,
      rarity: "legendary",
    },

    {
      name: "Rolex Submariner",
      value: 6000,
      rarity: "legendary",
    },

    {
      name: "iPhone 15 Pro",
      value: 5200,
      rarity: "epic",
    },

    {
      name: "PlayStation 5",
      value: 2500,
      rarity: "rare",
    },

    {
      name: "Mercedes AMG",
      value: 15000,
      rarity: "legendary",
    },

    {
      name: "Perfumy Dior",
      value: 700,
      rarity: "rare",
    },
  ];

  const boxes = [
    {
      name: "Gaming Box",

      price: 500,

      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    },

    {
      name: "Luxury Box",

      price: 1200,

      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    },

    {
      name: "Tech Box",

      price: 850,

      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475",
    },
  ];

  useEffect(() => {
    const savedBalance =
      localStorage.getItem("balance");

    const savedInventory =
      localStorage.getItem("inventory");

    if (savedBalance) {
      setBalance(Number(savedBalance));
    }

    if (savedInventory) {
      setInventory(JSON.parse(savedInventory));
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("balance", balance);

    localStorage.setItem(
      "inventory",
      JSON.stringify(inventory)
    );
  }, [balance, inventory]);

  const openBox = (price) => {
    if (balance < price) {
      alert("Nie masz wystarczającego salda!");

      return;
    }

    setBalance((prev) => prev - price);

    setOpening(true);

    setTimeout(() => {
      const randomReward =
        rewards[
          Math.floor(Math.random() * rewards.length)
        ];

      setReward(randomReward);

      setInventory((prev) => [
        randomReward,
        ...prev,
      ]);

      setOpening(false);
    }, 3000);
  };

  const sellItem = (index, value) => {
    setBalance((prev) => prev + value);

    setInventory((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  if (loading) {
    return (
      <div className="loading-screen">
        LOADING...
      </div>
    );
  }

  return (
    <div className="app">
      <div className="live-drops">
        <div className="live-track">
          {[...liveDrops, ...liveDrops].map(
            (drop, index) => (
              <div
                key={index}
                className="live-item"
              >
                {drop}
              </div>
            )
          )}
        </div>
      </div>

      <nav className="navbar">
        <h1>LOOTBOX</h1>

        <div className="nav-right">
          <div className="balance">
            {balance.toLocaleString()} zł
          </div>

          <button className="deposit-btn">
            Doładuj
          </button>
        </div>
      </nav>

      <section className="hero">
        <h2>Otwieraj Premium Skrzynki</h2>

        <p>
          Wygrywaj elektronikę, skiny,
          auta i luksusowe itemy.
        </p>
      </section>

      <section className="boxes-grid">
        {boxes.map((box, index) => (
          <div
            className="box-card"
            key={index}
          >
            <img
              src={box.image}
              alt={box.name}
            />

            <div className="box-info">
              <h3>{box.name}</h3>

              <span>{box.price} zł</span>
            </div>

            <button
              onClick={() =>
                openBox(box.price)
              }
            >
              Otwórz Skrzynkę
            </button>
          </div>
        ))}
      </section>

      <section className="inventory">
        <h2>Inventory</h2>

        <div className="inventory-grid">
          {inventory.map((item, index) => (
            <div
              key={index}
              className={`inventory-item ${item.rarity}`}
            >
              <h3>{item.name}</h3>

              <p>{item.value} zł</p>

              <button
                onClick={() =>
                  sellItem(index, item.value)
                }
              >
                Sprzedaj
              </button>
            </div>
          ))}
        </div>
      </section>

      {opening && (
        <div className="roller-overlay">
          <div className="roller-center"></div>

          <div className="roller-track">
            {[...Array(20)].map((_, index) => {
              const item =
                rewards[
                  Math.floor(
                    Math.random() *
                      rewards.length
                  )
                ];

              return (
                <div
                  key={index}
                  className={`roller-item ${item.rarity}`}
                >
                  <h3>{item.name}</h3>

                  <span>
                    {item.value} zł
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {reward && !opening && (
        <div
          className="reward-popup"
          onClick={() => setReward(null)}
        >
          <h2>Wygrałeś:</h2>

          <h1>{reward.name}</h1>

          <p>{reward.value} zł</p>
        </div>
      )}
    </div>
  );
}

export default App;