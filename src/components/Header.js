import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import SignUp from "./Signup";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Login from "./login";

const Header = () => {
  const handleLogin = () => {
    setLogin(true);
  };

  const handleSignup = () => {
    setSignUp(true);
  };

  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);

  return (
    <header>
      <SignUp
        signUp={signUp}
        setSignUp={setSignUp}
        className={signUp === false ? "hidden" : "modal"}
      />
      <Login
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
      <div className="searshButton">
        <FontAwesomeIcon className="searshButton" icon="search" />

        <input type="search" placeholder="rechercher des articles"></input>
      </div>
      <div className="subscribe">
        <button onClick={handleSignup}>s'inscrire</button>
      </div>
      <div className="login">
        <button onClick={handleLogin}> se connecter </button>
      </div>
      <div className="sellButton">
        <button> vends maintenant</button>
      </div>
    </header>
  );
};

export default Header;
