import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    fetch("https://629f94fc461f8173e4ececc6.mockapi.io/decks")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
      });
  }, []); //useEffect - говорит при первом рендере вызови эту функцию, при изменении кода в state снова ее не вызывай (иначе будут постоянные запросы на сервер)

  let onClickCart = () => {
    setCartOpened(true);
  };

  let onCloseСart = () => {
    setCartOpened(false);
  };

  const onAddToCart = (obj) => {
    setCartItems([...cartItems, obj]);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer cartItems={cartItems} onCloseCart={onCloseСart} />}
      {/* {showCart ? <Drawer onCloseCart={onCloseСart}/> : null} тот же результат что и свeрху && говорит если тут положительнок значение то выполни правую часть кода, если отрицательное то не выполняй*/}
      <Header onClickCart={onClickCart} />
      <div className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
          <h1 className="">All decks</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input type="text" placeholder="Search..." />
          </div>
        </div>
        <div className="decks d-flex flex-wrap">
          {items.map((item) => (
            <Card
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onFavorite={() => console.log("Add to favorite")}
              onCart={(obj) => onAddToCart(obj)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
