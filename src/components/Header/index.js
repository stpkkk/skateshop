import React from "react";
import "./Header.module.scss";

const Header = (props) => {
  return (
    <header className="d-flex justify-between align-center p-20">
      <div className="headerLeft d-flex align-center">
        <img src="/img/logo512.png" width={80} height={80} alt="logo" />
        <div>
          <h3 className="text-uppercase">STPK Skateshop</h3>
          <p className=" opacity-5">skateshop №1</p>
        </div>
      </div>
      <ul className="headerRight d-flex">
        <li className="mr-30 cu-p" onClick={props.onClickCart}>
          <img src="/img/cart.svg" alt="Cart" width={20} height={20} />
          <span>27 USD</span>
        </li>
        <li className="mr-30">
          <img src="/img/favorite.svg" alt="Favorite" width={20} height={20} />
        </li>
        <li>
          <img src="/img/user.svg" alt="Account" width={20} height={20} />
        </li>
      </ul>
    </header>
  );
};

export default Header;
