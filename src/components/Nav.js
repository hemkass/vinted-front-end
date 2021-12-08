import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Nav = ({
  className,
  setNav,
  connected,
  handleDeconnect,
  handleSignup,
  handleSale,
  setConnected,
  login,
  setLogin,
  handleCloseNav,
  handleLogin,
}) => {
  const token = Cookies.get("Login");

  return (
    <div className={`${className}`}>
      <form>
        <FontAwesomeIcon
          onClick={handleCloseNav}
          className="closebutton"
          icon="times"
        />
        <div className="nav">
          <div className={token ? "hidden" : "subscribe "}>
            <button onClick={handleSignup}>s'inscrire</button>
          </div>
          <div className={token ? "hidden" : "subscribe "}>
            <button onClick={handleLogin}> se connecter </button>
          </div>
          <div className={token ? "deconnect" : "hidden"}>
            <button onClick={handleDeconnect}> se déconnecter </button>
          </div>
          <div className="sellButton">
            <button onClick={handleSale}> vends maintenant</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Nav;
