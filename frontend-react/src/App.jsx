import React, { useState } from "react";

const cases = [
  {
    name: "Luxury Box",
    price: 50,
    items: ["Dior Sauvage", "iPhone 17 Pro", "BMW M4", "AK-47 Fire Serpent"]
  },
  {
    name: "Tech Box",
    price: 25,
    items: ["MacBook Pro", "RTX 6090", "PlayStation 6", "AirPods Max"]
  }
];

export default function App() {
  const [balance, setBalance] = useState(1000);
  const [result, setResult] = useState("");

  function openCase(box) {
    if (balance < box.price) {
      alert("Not enough balance");
      return;
    }

    setBalance(balance - box.price);

    const item = box.items[Math.floor(Math.random() * box.items.length)];
    setResult(item);
  }

  return (
    <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
        padding: "40px",
        fontFamily: "Arial"
      }}
    >
      <h1>Lootbox Demo</h1>

      <h2>Balance: ${balance}</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        {cases.map((box) => (
          <div
            key={box.name}
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "12px",
              width: "250px"
            }}
          >
            <h3>{box.name}</h3>

            <p>Price: ${box.price}</p>

            <button
              onClick={() => openCase(box)}
              style={{
                padding: "10px 20px",
                background: "#7c3aed",
                border: "none",
                borderRadius: "8px",
                color: "white",
                cursor: "pointer"
              }}
            >
              Open
            </button>
          </div>
        ))}
      </div>

      {result && (
        <div style={{ marginTop: "40px" }}>
          <h2>You won:</h2>

          <p>{result}</p>
        </div>
      )}
    </div>
  );
}