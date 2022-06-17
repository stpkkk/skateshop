import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Favorites from "./components/Favorites";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [favoriteItems, setFavoriteItems] = useState(false);
  const [favoritesOpened, setFavoritesItems] = useState(false);

  useEffect(() => {
    // fetch("https://629f94fc461f8173e4ececc6.mockapi.io/decks")
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((json) => {
    //     setItems(json);
    //   }); пример получения  даты с fetch, ниже с axios
    //useEffect - говорит при первом рендере вызови эту функцию, при изменении кода в state снова ее не вызывай (иначе будут постоянные запросы на сервер)
    axios
      .get("https://629f94fc461f8173e4ececc6.mockapi.io/decks")
      .then((res) => {
        setItems(res.data); //запрос на сервер с карточками товаров
      });
    axios
      .get("https://629f94fc461f8173e4ececc6.mockapi.io/cart")
      .then((res) => {
        setCartItems(res.data); //отправили запрос на сервер, , чтобы при обновлении корзины тоывары там сохранялись
      });
    axios
      .get("https://629f94fc461f8173e4ececc6.mockapi.io/favorite")
      .then((res) => {
        setFavoriteItems(res.data);
      });
  }, []);

  let onClickCart = () => {
    setCartOpened(true);
  };

  let onClickFavorite = () => {
    setFavoritesItems(true);
  };

  let onCloseСart = () => {
    setCartOpened(false);
  };

  let onCloseFavorites = () => {
    setFavoritesItems(false);
  };

  const onAddToCart = (obj) => {
    axios.post(`https://629f94fc461f8173e4ececc6.mockapi.io/cart`, obj); //постим добавленные товары в корзину и добавляем в бэкенд, чтобы при обновлении корзины товары там сохранялись
    // setCartItems([...cartItems, obj]);
    setCartItems((prev) => [...prev, obj]); //пушим в массив в Drawer(инзначально пустой) наш obj
    //prev берем предыдущие данные и пушим им obj, предпочтительней способ, потому что могут совпасть название переменных в большом проекте
  };

  const onRemoveItemCart = (id) => {
    axios.delete(`https://629f94fc461f8173e4ececc6.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id)); //удаляем cartItem из корзины
  };

  const onAddToFavorite = (obj) => {
    axios.post(`https://629f94fc461f8173e4ececc6.mockapi.io/favorite`, obj);
    setFavoriteItems((prev) => [...prev, obj]);
  };

  const onRemoveFavoriteItem = (id) => {
    axios.delete(`https://629f94fc461f8173e4ececc6.mockapi.io/favorite/${id}`);
    setFavoriteItems((prev) => prev.filter((item) => item.id !== id));
  };

  //Search
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
          onCloseCart={onCloseСart}
          onRemoveItemCart={onRemoveItemCart}
        />
      )}
      {/* {showCart ? <Drawer onCloseCart={onCloseСart}/> : null} тот же результат что и свeрху && говорит если тут положительнок значение то выполни правую часть кода, если отрицательное то не выполняй*/}

      <Header onClickCart={onClickCart} onClickFavorite={onClickFavorite} />
      <div className="content p-40">
        {favoritesOpened && (
          <Favorites
            onRemoveFavoriteItem={onRemoveFavoriteItem}
            onCloseFavorites={onCloseFavorites}
            favoriteItems={favoriteItems}
            onAddToCart={onAddToCart}
          />
        )}
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
                onFavorite={(obj) => onAddToFavorite(obj)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
