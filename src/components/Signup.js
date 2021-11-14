import "../App.css";
import "../css/form.css";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";
import { useState } from "react";

const SignUp = ({
  handlePassword,
  handleEmail,
  className,

  setConnected,

  setSignUp,
  username,

  email,

  handleUsername,
  password,
}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleClose = () => {
    setSignUp(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const sendData = async () => {
      await axios
        .post("https://myvintedapp.herokuapp.com/user/signup", {
          email: `${email}`,
          username: `${username}`,
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
        <h1>S'inscrire</h1>
        <input
          onChange={handleUsername}
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
        ></input>
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
        {!isLoading && (
          <div>
            <span className="error">{data.message}</span>
          </div>
        )}
        <span className="checkbox">
          <label>
            <input type="checkbox"></input> S'inscrire à notre Newsletter
          </label>
        </span>
        <p>
          En m'inscrivant, je confirme que j'ai accepté les Termes et Conditions
          de Vinted, avoir lu la Politique de Confidentialité, et que j'ai plus
          de 18 ans.
        </p>
        <div className="submitbutton">
          <button type="Submit">Envoyer</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
