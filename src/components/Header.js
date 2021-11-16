import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import SignUp from "./Signup";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { Range } from "rc-slider";
import "rc-slider/assets/index.css";

import Login from "./login";

const Header = ({
  setLogin,
  login,
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
  const token = Cookies.get("Login");

  const [connected, setConnected] = useState(false);
  const handleLogin = () => {
    setLogin(true);
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
  };

  return (
    <header>
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
      <div>
        <img
          className="logo"
          src="https://res.cloudinary.com/dyj84szrx/image/upload/v1636546324/vinted/Vinted-logo_jym1qv.png"
          alt="logo"
        ></img>
      </div>
      <div
        className="searshButton"
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      >
        <FontAwesomeIcon className="searshButton" icon="search" />
        <input type="search" placeholder="rechercher des articles"></input>
        <span>
          <input
            type="checkbox"
            name="price"
            onChange={(event) => {
              sort === "price-desc"
                ? setSort("price-asc")
                : setSort("price-desc");
            }}
          ></input>
        </span>
        <span>
          <Range
            min={0}
            max={1000}
            draggableTrack={true}
            step={10}
            defaultValue={[10, 100]}
            allowCross={false}
            pushable={5}
            onChange={(value) => {
              setPriceMin(Number(value[0]));
              console.log(priceMin);
              setPriceMax(value[1]);
            }}
          />
        </span>
        <span></span>
      </div>
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
    </header>
  );
};

export default Header;
