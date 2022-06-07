import React, { useState } from "react";
import styles from "./Card.module.scss";

const Card = ({ onFavorite, title, price, imageUrl, onCart }) => {
  const [isAdded, setIsAdded] = useState(false);

  let onClickAdd = () => {
    onCart({title, imageUrl, price});
    setIsAdded(!isAdded); //"!"" чтобы добавлять и снимать кнопку, можно поставить true чтобы оставить
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onFavorite}>
        <img
          src="/img/heart-off.svg"
          width={30}
          height={30}
          alt="Add to favorite"
        />
      </div>
      <img src={imageUrl} width={133} height={133} alt="Baker1" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Price:</span>
          <b>{price} USD</b>
        </div>
        <img
          className={styles.plus}
          onClick={onClickAdd}
          src={isAdded ? "./img/button-added.svg" : "./img/button-plus.svg"}
          alt="Добавить"
        />
      </div>
    </div>
  );
};

export default Card;
