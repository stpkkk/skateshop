import React, { useEffect, useState } from "react";
import axios from "axios";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Favorites from "./pages/Favorites";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AppContext from "./context";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [favoritesOpened, setFavoritesOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const cartResponse = await axios.get(
        "https://629f94fc461f8173e4ececc6.mockapi.io/decks"
      );
      const favoriteResponse = await axios.get(
        "https://629f94fc461f8173e4ececc6.mockapi.io/favorites"
      );
      const itemsResponse = await axios.get(
        "https://629f94fc461f8173e4ececc6.mockapi.io/cart"
      ); //сказали данные вытащи в любом порядке
      //но сохраняй информацию в state в след порядке:

      setIsLoading(false);

      setCartItems(favoriteResponse.data);
      setFavoriteItems(itemsResponse.data);
      setItems(cartResponse.data);
    }

    fetchData();
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
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(
        `https://629f94fc461f8173e4ececc6.mockapi.io/cart/${obj.id}`
      );
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(obj.id))
      );
    } else {
      axios.post(`https://629f94fc461f8173e4ececc6.mockapi.io/cart`, obj); //постим добавленные товары в корзину и добавляем в бэкенд, чтобы при обновлении корзины товары там сохранялись
      // setCartItems([...cartItems, obj]);
      //пушим в массив в Drawer(инзначально пустой) наш obj
      setCartItems((prev) => [...prev, obj]);
    }
  };

  const onRemoveItemCart = (id) => {
    axios.delete(`https://629f94fc461f8173e4ececc6.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id)); //удаляем cartItem из корзины
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favoriteItems.find((favObj) => favObj.id === obj.id)) {
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
    <AppContext.Provider value={{ cartItems, items,  favoriteItems }}>
      <div className="wrapper clear">
        {cartOpened && (
          <Drawer
            cartItems={cartItems}
            onCloseCart={onCloseСart}
            onRemoveItemCart={onRemoveItemCart}
          />
        )}

        <Header onClickCart={onClickCart} onClickFavorite={onClickFavorite} />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Home
                cartItems={cartItems}
                items={items}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onClearSearchInput={onClearSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                favoritesOpened={favoritesOpened}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/favorites"
            exact
            element={
              <Favorites
                // favoriteItems={favoriteItems}
                onAddToCart={onAddToCart}
                onAddToFavorite={onAddToFavorite}
              />
            }
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
