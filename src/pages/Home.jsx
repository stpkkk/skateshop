import React from "react";
import Card from "../components/Card";

const Home = ({
  items,
  searchValue,
  onChangeSearchInput,
  onClearSearchInput,
  onAddToFavorite,
  onAddToCart,
}) => {
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
      <div className="d-flex flex-wrap">
        {items
          .filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
          ) //логика строки поиска!!!!!!!!!!!!!!
          .map((item, index) => (
            <Card
              key={index}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onCart={(obj) => onAddToCart(obj)}
              onFavorite={(obj) => onAddToFavorite(obj)} //для значка сердечкав избранном
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
