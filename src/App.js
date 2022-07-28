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
        "https://629f94fc461f8173e4ececc6.mockapi.io/cart"
      );
      const favoriteResponse = await axios.get(
        "https://629f94fc461f8173e4ececc6.mockapi.io/favorites"
      );
      const itemsResponse = await axios.get(
        "https://629f94fc461f8173e4ececc6.mockapi.io/decks"
      ); //сказали данные вытащи в любом порядке
      //но сохраняй информацию в state в след порядке:

      setIsLoading(false);

	  setCartItems(cartResponse.data);
      setFavoriteItems(favoriteResponse.data);
      setItems(itemsResponse.data);
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

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://629f94fc461f8173e4ececc6.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post('https://629f94fc461f8173e4ececc6.mockapi.io/cart', obj);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
      console.error(error);
    }
  };

//   const onAddToCart = (obj) => {
//     if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
//       axios.delete(
//         `https://629f94fc461f8173e4ececc6.mockapi.io/cart/${obj.id}`
//       );
//       setCartItems((prev) =>
//         prev.filter((item) => Number(cartItems.id) !== Number(obj.id))
//       );
//     } else {
//       axios.post(`https://629f94fc461f8173e4ececc6.mockapi.io/cart`, obj); //постим добавленные товары в корзину и добавляем в бэкенд, чтобы при обновлении корзины товары там сохранялись
//       // setCartItems([...cartItems, obj]);
//       //пушим в массив в Drawer(инзначально пустой) наш obj
//       setCartItems((prev) => [...prev, obj]);
//     }
//   };

  const onRemoveItemCart = (id) => {
    axios.delete(`https://629f94fc461f8173e4ececc6.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id)); //удаляем cartItem из корзины
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favoriteItems.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(
          `https://629f94fc461f8173e4ececc6.mockapi.io/favorites/${obj.id}`
        );
		setFavoriteItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(obj.id))
      );
      } else {
        const { data } = await axios.post(
          `https://629f94fc461f8173e4ececc6.mockapi.io/favorites`,
          obj
        ); // ждем делит запрос потом отправляем этот запрос, await говорит что сначала выполни пред запрос , т.е. с помощь. этого запроса берем обьект не с home.jsx а с бэкэнда и дальше отрисовываем его

        setFavoriteItems((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Could not be added to favorite");
    }
  }; //trycatch нужен чтобы отловить ошибку при вызове запроса, а без него не узнать когда эта ошибка произойдет

  //Search
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const onClearSearchInput = () => {
    setSearchValue("");
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));

  };
//   console.log(items);


  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        setCartItems,
        favoriteItems,
        onAddToFavorite,
        isItemAdded,
        onAddToCart,
        setCartOpened,
		onCloseСart
      }}
    >
      <div className="wrapper clear">
        {cartOpened && (
          <Drawer
            items={cartItems}
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
                favoritesOpened={favoritesOpened}//?
                isLoading={isLoading}
				isItemAdded={isItemAdded}
              />
            }
          />
          <Route
            path="/favorites"
            exact
            element={
              <Favorites
              />
            }
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
