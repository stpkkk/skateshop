import React, { useState } from "react";
import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";

const Card = ({
  id,
  title,
  price,
  imageUrl,
  onCart,
  onFavorite,
  favorited = false,
  added = false,
  loading,
}) => {
  const [isAdded, setIsAdded] = useState(added);
  const [isFavorite, setIsFavorite] = useState(favorited);

  let onClickAdd = () => {
    onCart({ id, title, imageUrl, price }); //при клике передаем в Drawer(корзину) эти данные сюда передается obj это obj в onAddToCart
    setIsAdded(!isAdded); //"!"" чтобы добавлять и снимать кнопку, можно поставить true чтобы оставить
  };

  const addToFavorite = () => {
    onFavorite({ id, title, imageUrl, price });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={210}
          height={260}
          viewBox="0 0 210 260"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="170" height="140" />
          <rect x="0" y="160" rx="5" ry="5" width="170" height="15" />
          <rect x="0" y="180" rx="5" ry="5" width="93" height="15" />
          <rect x="0" y="225" rx="5" ry="5" width="60" height="28" />
          <rect x="135" y="222" rx="5" ry="5" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
            <div className={styles.favoriteItems} onClick={addToFavorite}>
              <img
                src={isFavorite ? "/img/heart-on.svg" : "./img/heart-off.svg"}
                width={31}
                height={31}
                alt="Add to favoriteItems"
              />
            </div>
            <img src={imageUrl} width="100%" height={160} alt="Baker1" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Price:</span>
                <b>{price} USD</b>
              </div>
              <img
                className={styles.plus}
                onClick={onClickAdd}
                src={
                  isAdded ? "./img/button-added.svg" : "./img/button-plus.svg"
                }
                alt="Добавить"
              />
            </div>
        </>
      )}
    </div>
  );
};

export default Card;
