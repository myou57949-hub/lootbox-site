import "./App.css";
import { useState } from "react";

const boxes = [
  {
    name: "Skiny CS2",
    price: 25,
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Luksusowe Perfumy",
    price: 80,
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Elektronika",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
  },
];

const rewards = [
  {
    name: "AK-47 Neon Rider",
    rarity: "rare",
    value: 45,
  },
  {
    name: "iPhone 15 Pro",
    rarity: "epic",
    value: 4200,
  },
  {
    name: "Mercedes AMG",
    rarity: "legendary",
    value: 250000,
  },
  {
    name: "Dior Sauvage",
    rarity: "rare",
    value: 520,
  },
  {
    name: "Rolex Submariner",
    rarity: "epic",
    value: 62000,
  },
  {
    name: "AWP Dragon Lore",
    rarity: "legendary",
    value: 120000,
  },
];

const rollerItems = [...rewards, ...rewards, ...rewards];

const liveDrops = [
  "kuba123 wygrał iPhone 15 Pro",
  "snajper wygrał AWP Dragon Lore",
  "adam777 wygrał Rolex Submariner",
  "mati wygrał Mercedes AMG",
  "player1337 wygrał PlayStation 5",
];

function App() {
  const [opening, setOpening] = useState(false);
  const [reward, setReward] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [balance, setBalance] = useState(12450);

  const openBox = (price) => {
    if (balance < price) {
      alert("Nie masz wystarczającego salda!");
      return;
    }

    setBalance((prev) => prev - price);

    setOpening(true);

    setTimeout(() => {
      const randomReward =
        rewards[Math.floor(Math.random() * rewards.length)];

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

  return (
    <div className="app">
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
          Wygrywaj skiny CS2, perfumy,
          elektronikę i auta.
        </p>
      </section>

      {opening && (
        <div className="opening-screen">
          <div className="roller">
            <div className="roller-track">
              {rollerItems.map((item, index) => (
                <div
                  className={`roller-item ${item.rarity}`}
                  key={index}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>

          <h2>Otwieranie skrzynki...</h2>
        </div>
      )}

      {reward && (
        <div className="reward-popup">
          <h2>🎉 Wygrałeś:</h2>

          <h1 className={reward.rarity}>
            {reward.name}
          </h1>

          <p>
            {reward.value.toLocaleString()} zł
          </p>
        </div>
      )}

      <section className="boxes-grid">
        {boxes.map((box, index) => (
          <div className="box-card" key={index}>
            <img src={box.image} alt={box.name} />

            <div className="box-info">
              <h3>{box.name}</h3>

              <span>{box.price} zł</span>
            </div>

            <button onClick={() => openBox(box.price)}>
              Otwórz Skrzynkę
            </button>
          </div>
        ))}
      </section>

      <section className="inventory">
        <h2>🎒 Twój Ekwipunek</h2>

        <div className="inventory-grid">
          {inventory.map((item, index) => (
            <div
              className={`inventory-item ${item.rarity}`}
              key={index}
            >
              <h3>{item.name}</h3>

              <p>
                {item.value.toLocaleString()} zł
              </p>

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
    </div>
  );
}

export default App;