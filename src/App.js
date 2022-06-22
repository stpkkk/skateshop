import React, { useEffect, useState } from "react";
import axios from "axios";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Favorites from "./pages/Favorites";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [favoritesOpened, setFavoritesOpened] = useState(false);

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
      .get("https://629f94fc461f8173e4ececc6.mockapi.io/favorites")
      .then((res) => {
        setFavoriteItems(res.data);
      });
  }, []);

  let onClickCart = () => {
    setCartOpened(true);
  };

  let onClickFavorite = () => {
    setFavoritesOpened(true);
  };

  let onCloseСart = () => {
    setCartOpened(false);
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

  const onAddToFavorite = async (obj) => {
    try {
      if (favoriteItems.find((favObj) => (favObj.id = obj.id))) {
        axios.delete(
          `https://629f94fc461f8173e4ececc6.mockapi.io/favorites/${obj.id}`
        );
      } else {
        const { data } = await axios.post(
          `https://629f94fc461f8173e4ececc6.mockapi.io/favorites`,
          obj
        ); // ждем делит запрос потом отправляем этот запрос, await говорит что сначала выполни пред запрос , т.е. с помощь. этого запроса берем обьект не с home.jsx а с бэкэнда и дальше отрисовываем его

        setFavoriteItems((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("could not be added to favorite");
    }
  }; //trycatch нужен чтобы отловить ошибку при вызове запроса, а без него не узнать когда эта ошибка произойдет

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
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onClearSearchInput={onClearSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              favoritesOpened={favoritesOpened}
            />
          }
        />
        <Route
          path="/favorites"
          exact
          element={
            <Favorites
              favoriteItems={favoriteItems}
              onAddToCart={onAddToCart}
              onAddToFavorite={onAddToFavorite}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
