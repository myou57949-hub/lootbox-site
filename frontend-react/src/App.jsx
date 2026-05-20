import "./App.css";

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
  {
    name: "Super Auta",
    price: "1200 zł",
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
          <div className="balance">12 450 zł</div>
          <button className="deposit-btn">Doładuj</button>
        </div>
      </nav>

      <section className="hero">
        <h2>Otwieraj Premium Skrzynki</h2>

        <p>
          Wygrywaj skiny CS2, perfumy, elektronikę,
          sneakersy, zegarki i nawet auta.
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

            <button>Otwórz Skrzynkę</button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;