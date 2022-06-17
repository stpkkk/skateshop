import React from "react";
import styles from "./Drawer.module.scss";
import "../../index.scss";

const Drawer = ({ onCloseCart, cartItems = [], onRemoveItemCart }) => {
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

        {cartItems.length > 0 ? (
          <>
            <div className={styles.cartItems}>
              {cartItems.map((obj, index) => (
                <div className={styles.cartItem} key={index}>
                  <img src={obj.imageUrl} width={80} height={80} alt="Deck" />
                  <div className="mr-20">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} USD</b>
                  </div>

                  <img
                    onClick={() => onRemoveItemCart(obj.id)}
                    className={styles.removeBtn}
                    src="/img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
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
              <button className="greenButton">
                Order{" "}
                <img
                  src="/img/arrow-right.svg"
                  width={13}
                  height={13}
                  alt="Order"
                />
              </button>
            </div>
          </>
        ) : (
          <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img
              className="mb-20"
              width="120px"
              height="120px"
              src="/img/empty-cart.png"
              alt="Empty"
            />
            <h2>Cart is Empty</h2>
            <p className="opacity-6">
              Add some stuff in a cart to make an order!
            </p>
            <button onClick={onCloseCart} className="greenButton">
              <img src="/img/arrow-left.svg" alt="Back" />
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Drawer;
