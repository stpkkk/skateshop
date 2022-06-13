import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    // fetch("https://629f94fc461f8173e4ececc6.mockapi.io/decks")
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((json) => {
    //     setItems(json);
    //   }); пример получения  даты с fetch, ниже с axios

    axios
      .get("https://629f94fc461f8173e4ececc6.mockapi.io/decks")
      .then((res) => {
        setItems(res.data);
      });
  }, []); //useEffect - говорит при первом рендере вызови эту функцию, при изменении кода в state снова ее не вызывай (иначе будут постоянные запросы на сервер)

  let onClickCart = () => {
    setCartOpened(true);
  };

  let onCloseСart = () => {
    setCartOpened(false);
  };

  const onAddToCart = (obj) => {
    axios.post("https://629f94fc461f8173e4ececc6.mockapi.io/cart", obj); //постим в добавленные товары в корзину и добавляем в бэкенд, чтобы при обновлении корзины тоывары там сохранялись
    // setCartItems([...cartItems, obj]);
    setCartItems((prev) => [...prev, obj]); //пушим в массив в Drawer(инзначально пустой) наш obj
    //prev берем предыдущие данные и пушим им obj, предпочтительней способ, потому что могут совпасть название переменных в большом проекте
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const onClearSearchInput = () => {
    setSearchValue("");
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          cartItems={cartItems}
          setCartItems={setCartItems}
          onCloseCart={onCloseСart}
        />
      )}
      {/* {showCart ? <Drawer onCloseCart={onCloseСart}/> : null} тот же результат что и свeрху && говорит если тут положительнок значение то выполни правую часть кода, если отрицательное то не выполняй*/}
      <Header onClickCart={onClickCart} />
      <div className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
          <h1>{searchValue ? `Search by: "${searchValue}"` : "All decks"}</h1>
          <div className="search-block d-flex">
            {searchValue && (
              <img
                onClick={onClearSearchInput}
                className="inputClear"
                src="/img/x.svg"
                alt="Clear"
              />
            )}
            <img src="/img/search.svg" alt="Search" />
            <input
              onChange={onChangeSearchInput}
              value={searchValue} //чтобы импут был контролируемым, чтобы например добавить в импут кнопку стереть, т.е. привязываемся к этому value
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="decks d-flex flex-wrap">
          {items
            .filter((item) =>
              item.title.toLowerCase().includes(searchValue.toLowerCase())
            ) //логика строки поиска
            .map((item, index) => (
              <Card
                key={index}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onCart={(obj) => onAddToCart(obj)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
