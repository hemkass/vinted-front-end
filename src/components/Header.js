import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import PriceRange from "./priceRange";

import "rc-slider/assets/index.css";

import Nav from "./Nav";
import SignUp from "./Signup";
import Login from "./login";

const Header = ({
  setLogin,
  login,
  nav,
  setNav,
  signUp,
  setSignUp,
  setTitle,
  setPriceMax,
  priceMax,
  setPriceMin,
  priceMin,
  setSort,
  sort,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = Cookies.get("Login");

  const [connected, setConnected] = useState(false);
  const handleLogin = () => {
    setLogin(true);
  };

  const handleNav = () => {
    setNav(true);
  };

  const handleCloseNav = () => {
    setNav(false);
  };

  const handleSale = () => {
    if (token) {
      navigate("/publish");
    } else {
      setLogin(true);
    }
  };

  const handleSignup = () => {
    setSignUp(true);
  };

  const handleDeconnect = () => {
    setConnected(false);
    Cookies.remove("Login");
    window.location.reload(false);
  };

  return (
    <header>
      <Nav
        handleCloseNav={handleCloseNav}
        handleLogin={handleLogin}
        connected={connected}
        handleDeconnect={handleDeconnect}
        handleSignup={handleSignup}
        handleSale={handleSale}
        setConnected={setConnected}
        login={login}
        setLogin={setLogin}
        className={nav === false ? "hidden" : "modal"}
      />
      <SignUp
        connected={connected}
        setConnected={setConnected}
        signUp={signUp}
        setSignUp={setSignUp}
        className={signUp === false ? "hidden" : "modal"}
      />
      <Login
        connected={connected}
        setConnected={setConnected}
        login={login}
        setLogin={setLogin}
        className={login === false ? "hidden" : "modal"}
      />
      <div
        onClick={() => {
          navigate("/");
        }}
      >
        <img
          className="logo"
          src="https://res.cloudinary.com/dyj84szrx/image/upload/v1636546324/vinted/Vinted-logo_jym1qv.png"
          alt="logo"
        ></img>
      </div>
      <div className="searchBloc">
        <div
          className="searshButton"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        >
          <FontAwesomeIcon className="searshButton" icon="search" />
          <input type="search" placeholder="rechercher des articles"></input>
        </div>{" "}
        {location.pathname === "/" ? (
          <div className="span">
            <span>
              <span>Trier par prix : </span>
              <span className="checkbox">
                <input type="checkbox" checked={sort} name="price" />

                <div
                  className="wrapper"
                  onClick={() => {
                    sort === "price-desc"
                      ? setSort("price-asc")
                      : setSort("price-desc");
                  }}
                >
                  <div className={sort === "price-asc" ? "knob" : "leftknob"}>
                    <span>{sort === "price-asc" ? "⇣" : "⇡"}</span>
                  </div>
                </div>
              </span>
            </span>
            <span>
              <PriceRange
                setPriceMax={setPriceMax}
                priceMax={priceMax}
                setPriceMin={setPriceMin}
                priceMin={priceMin}
              />
            </span>
          </div>
        ) : null}
      </div>
      {/* {console.log(token)} */}
      <div className="Menu hiddenTab">
        <FontAwesomeIcon
          className="button"
          icon="bars"
          onClick={handleNav}
        ></FontAwesomeIcon>
      </div>
      <span className="MenuButton">
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
      </span>
    </header>
  );
};

export default Header;
