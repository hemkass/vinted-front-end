import "../App.css";
import "../css/form.css";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";
import { useState } from "react";

const Login = ({
  className,
  connected,
  setConnected,
  login,
  setLogin,
  email,
  setEmail,
  handlePassword,
  handleEmail,
  password,
  setPassword,
}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleClose = () => {
    setLogin(false);
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
    if (data.token) {
      Cookies.set("Login", data.token, { expires: 30 });
      setConnected(true);
      setLogin(false);
    }
  };

  return (
    <div className={className}>
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
        <div className="submitbutton">
          <button type="Submit">se connecter</button>
        </div>{" "}
        {!isLoading && (
          <div>
            <span className="error">{data.message}</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
