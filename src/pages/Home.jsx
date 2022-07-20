import React from "react";
import Card from "../components/Card";

const Home = ({
  cartItems,
  items,
  searchValue,
  onChangeSearchInput,
  onClearSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) => {
  const renderItems = () => {
	const filteredItems = items.filter((item) =>
	item.title.toLowerCase().includes(searchValue.toLowerCase()))//строка поиска ?!!!
	const isAdded = () => {
		cartItems.some((obj) => Number(obj.id) === Number(cartItems.id))//?
	}
    return (isLoading ? [...Array(8)] : filteredItems
  ) //Если загрузка идет у нас будет массив из 8 фейковых  карточек со значением underfined иначе возвращаем отфильтрованные карточки
       
      .map((item, index) => (
        <Card
          key={index}
          
          onCart={(obj) => onAddToCart(obj)}
          onFavorite={(obj) => onAddToFavorite(obj)} //для значка сердечка в избранном
          loading={isLoading}
          added={isAdded} //Eсли хотябы одно условие совапало (true)
          {...item} //передаем id, title price и т.д.
        />
      ));
  };
  return (
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
      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
};

export default Home;
