import { React, useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.module.css";
import { useCart } from "../../hooks/useCart";
import ReactSwitch from "react-switch"; //toggle for theme

import AppContext from "../../contexts/context";
import { useUserContext } from "../../contexts/userContext";

const Header = props => {
  const { totalPrice } = useCart();

  const { theme, toggleTheme } = useContext(AppContext);
  const { logOutUser, user } = useUserContext();

  const handleSignOut = async () => {
    try {
      await logOutUser();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(totalPrice);

  return (
    <header className="d-flex justify-between align-center p-20">
      <Link to="/">
        <div className="headerLeft d-flex align-center">
          <img src="img/logo512.png" width={80} height={80} alt="logo" />
          <div>
            <h3 className="text-uppercase">STPK Skateshop</h3>
            <p className=" opacity-5">skateshop №1</p>
          </div>
        </div>
      </Link>
      <ul className="headerRight d-flex">
        <li className="switch mr-30 cu-p d-flex">
          <div className="mr-10">
            {theme === "light" ? "Light mode" : "Dark mode"}
          </div>
          <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
        </li>
        <li className="mr-30 cu-p" onClick={props.onClickCart}>
          <img src="img/cart.svg" alt="Cart" width={20} height={20} />
          <span>{totalPrice.toFixed(2)} USD</span>
        </li>
        <li className="mr-30 cu-p">
          <Link to="/favorites">
            <img
              src="img/favorite.svg "
              alt="Favorite"
              width={20}
              height={20}
            />
          </Link>
        </li>
        <Link to="/orders">
          <li className="pr-20">
            <img
              className="cu-p "
              src="img/User.svg"
              alt="Account"
              width={20}
              height={20}
            />
          </li>
        </Link>

        {user ? (
          <Link to="/">
            <li className="cu-p d-flex" onClick={handleSignOut}>
              <div className="mr-10 justify-content-center">Log Out</div>
              <img src="img/login.svg" alt="Log Out" width={20} height={20} />
            </li>
          </Link>
        ) : (
          <Link to="/authform">
            <li className="cu-p d-flex">
              <div className="mr-10 justify-content-center">Log in</div>
              <img src="img/login.svg" alt="Log In" width={20} height={20} />
            </li>
          </Link>
        )}
      </ul>
    </header>
  );
};

export default Header;
