import React from "react";
import styles from "./Drawer.module.scss";
import "./Drawer.module.scss";

const Drawer = ({ onCloseCart, cartItems = [], }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-20">
          Cart
          <img
            onClick={onCloseCart}
            className={styles.removeBtn}
            src="/img/btn-remove.svg"
            alt="Close"
          />
        </h2>
        <div className={styles.cartItems}>
          {cartItems.map((obj) => (
            <div className={styles.cartItem}>
              <img src={obj.imageUrl} width={80} height={80} alt="Deck" />
              <div className="mr-20">
                <p className="mb-5">{obj.title}</p>
                <b>{obj.price} USD</b>
              </div>
              <img
                className={styles.removeBtn}
                src="/img/btn-remove.svg"
                alt="Remove"
              />
            </div>
          ))}

          <div>
            <div className={styles.cartTotalBlock}>
              <ul>
                <li>
                  <span>Total:</span>
                  <div></div>
                  <b>198 USD</b>
                </li>
                <li>
                  <span>Tax 13%:</span>
                  <div></div>
                  <b>25.74 USD</b>
                </li>
              </ul>
              <button className={styles.greenButton}>
                Order{" "}
                <img
                  src="/img/arrow-right.svg"
                  width={13}
                  height={13}
                  alt="Order"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
