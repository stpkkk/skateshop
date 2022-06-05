//img путь к картинке react найдет сам в папке public
import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

function App() {
  const arr = [
    { title: "BAKER BRAND LOGO DECK", price: 99, imageUrl: "/img/Decks/1.jpg" },
    {
      title: "BAKER JF BRAND NAME NOISE DECK",
      price: 100,
      imageUrl: "/img/Decks/2.jpg",
    },
    {
      title: "BAKER JF BRAND NAME NOISE DECK Pink",
      price: 95,
      imageUrl: "/img/Decks/3.jpg",
    },
    { title: "BAKER BAKED GREEN", price: 110, imageUrl: "/img/Decks/4.jpg" },
  ];

  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
      <div className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
          <h1 className="">All decks</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input type="text" placeholder="Search..." />
          </div>
        </div>
        <div className="decks d-flex">
          {arr.map((obj) => (
            <Card title={obj.title} price={obj.price} imageUrl={obj.imageUrl} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
