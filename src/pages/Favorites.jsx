import React from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import "../index.scss";

const Favorites = ({ favoriteItems = [], onAddToCart, onAddToFavorite }) => {
  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40">
        <Link to="/">
          <img
            className="cu-p mr-20"
            src="/img/close-favorite.svg"
            alt="On main"
            width={35}
            height={35}
          />
        </Link>
        <h1>My bookmarks</h1>
      </div>
      {favoriteItems.length > 0 ? (
        <div className="d-flex flex-wrap">
          {favoriteItems.map((item, index) => (
            <Card
              key={index}
              onCart={(obj) => onAddToCart(obj)}
              onFavorite={onAddToFavorite}
              favorited={true}
              {...item} //передаем весь item id title price imgUrl как в Home.jsx,  передаем id в кард для того чтобы удалить добавить в избранное кнопка сердце
            />
          ))}
        </div>
      ) : (
        <div className="favoritesEmpty mt-50 d-flex align-center  flex-column ">
          <img
            src="/img/nothing-in-favorites.png"
            alt="Empty in Favorites"
            width={70}
            height={70}
          />
          <h2>No Favorites </h2>
          <p>Nothing added to favorites</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
