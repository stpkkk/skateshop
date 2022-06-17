import React from "react";
import styles from "./Favorites.module.scss";
import "./Favorites.module.scss";
import Card from "../Card";
import Header from "../Header";

const Favorites = ({
  onRemoveFavoriteItem,
  onCloseFavorites,
  favoriteItems = [],
  onAddToCart,
}) => {
  return (
    <div className={styles.favoriteOverlay}>
      <Header />
      {favoriteItems.length > 0 ? (
        <>
          <div className="p-30 d-flex align-center">
            <img
              className="cu-p mr-20"
              onClick={onCloseFavorites}
              src="/img/close-favorite.svg"
              alt="On main"
              width={35}
              height={35}
            />
            <h2>My favorite</h2>
          </div>
          <div className="d-flex flex-wrap pl-30">
            {favoriteItems.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onCart={(obj) => onAddToCart(obj)}
                // onRemoveBtn={onRemoveFavoriteItem}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="cartEmpty mt-50 d-flex align-center  flex-column flex">
          <img
            src="/img/nothing-in-favorites.png"
            alt="Empty in Favorites"
            width={70}
            height={70}
          />
          <h2>No Favorites </h2>
          <p>Nothing added to favorites</p>
          <button onClick={onCloseFavorites} className="greenButton">
            <img src="/img/arrow-left.svg" alt="Back" />
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Favorites;
