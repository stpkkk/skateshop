import React from "react";
import styles from "./Card.module.scss";

const Card = (props) => {
  const onClickButton = () => {
    alert(props.title);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img
          src="/img/heart-off.svg"
          width={30}
          height={30}
          alt="Add to favorite"
        />
      </div>
      <img src={props.imageUrl} width={133} height={133} alt="Baker1" />
      <h5>{props.title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Price:</span>
          <b>{props.price} USD</b>
        </div>
        <button className={styles.button} onClick={onClickButton}>
          <img src="/img/plus.svg" alt="Добавить" />
        </button>
      </div>
    </div>
  );
};

export default Card;
