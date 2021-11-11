import "../App.css";
import "../css/form.css";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";
import { useState, useEffect } from "react";

const Login = ({
  className,
  login,
  setLogin,

  email,
  setEmail,

  password,
  setPassword,
}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handleClose = () => {
    setLogin(false);
  };

  const handlePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const sendData = async () => {
      await axios
        .post("https://myvintedapp.herokuapp.com/user/login", {
          email: `${email}`,
          password: `${password}`,
        })
        .then(function (response) {
          setData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    sendData();
    setIsLoading(false);
    Cookies.set("Login", data.token, { expires: 30 });
  };

  return (
    <div className={className}>
      {" "}
      <form onSubmit={handleSubmit}>
        <FontAwesomeIcon
          onClick={handleClose}
          className="closebutton"
          icon="times"
        />
        <h1>Se connecter</h1>

        <input
          onChange={handleEmail}
          type="email"
          placeholder="Email"
          value={email}
        ></input>
        <input
          onChange={handlePassword}
          type="password"
          placeholder="Mot de passe"
          value={password}
        ></input>
        <div>
          <button type="Submit">se connecter</button>
        </div>
      </form>
      {!isLoading && (
        <div>
          {console.log("mes données :", data)} "hello :" {data.token}
        </div>
      )}
    </div>
  );
};

export default Login;
