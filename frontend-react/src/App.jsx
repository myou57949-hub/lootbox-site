import "./App.css";
import { useState } from "react";

const boxes = [
  {
    name: "Skiny CS2",
    price: "25 zł",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Luksusowe Perfumy",
    price: "80 zł",
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Elektronika",
    price: "250 zł",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
  },
];

const rewards = [
  { name: "AK-47 Neon Rider", rarity: "rare" },
  { name: "iPhone 15 Pro", rarity: "epic" },
  { name: "Mercedes AMG", rarity: "legendary" },
  { name: "Dior Sauvage", rarity: "rare" },
];

function App() {
  const [opening, setOpening] = useState(false);
  const [reward, setReward] = useState(null);
  const [inventory, setInventory] = useState([]);

  const openBox = () => {
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

  return (
    <div className="app">
      <nav className="navbar">
        <h1>LOOTBOX</h1>

        <div className="nav-right">
          <div className="balance">12 450 zł</div>
          <button className="deposit-btn">Doładuj</button>
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
          <div className="spinner"></div>
          <h2>Otwieranie skrzynki...</h2>
        </div>
      )}

      {reward && (
        <div className="reward-popup">
          <h2>🎉 Wygrałeś:</h2>

          <h1 className={reward.rarity}>
            {reward.name}
          </h1>
        </div>
      )}

      <section className="boxes-grid">
        {boxes.map((box, index) => (
          <div className="box-card" key={index}>
            <img src={box.image} alt={box.name} />

            <div className="box-info">
              <h3>{box.name}</h3>
              <span>{box.price}</span>
            </div>

            <button onClick={openBox}>
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
              {item.name}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;