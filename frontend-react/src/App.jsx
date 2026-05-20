import "./App.css";

const boxes = [
  {
    name: "CS2 Skins",
    price: "$5",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Luxury Perfumes",
    price: "$20",
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Electronics",
    price: "$50",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Super Cars",
    price: "$250",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop",
  },
];

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <h1>LOOTBOX</h1>

        <div className="nav-right">
          <div className="balance">$12,450</div>
          <button className="deposit-btn">Deposit</button>
        </div>
      </nav>

      <section className="hero">
        <h2>Open Premium Mystery Boxes</h2>
        <p>
          Win skins, perfumes, electronics, sneakers, watches and even cars.
        </p>
      </section>

      <section className="boxes-grid">
        {boxes.map((box, index) => (
          <div className="box-card" key={index}>
            <img src={box.image} alt={box.name} />

            <div className="box-info">
              <h3>{box.name}</h3>
              <span>{box.price}</span>
            </div>

            <button>Open Box</button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;