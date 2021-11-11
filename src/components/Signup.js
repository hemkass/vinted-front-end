import "../App.css";
import "../css/form.css";
import Cookies from "js-cookie";

import axios from "axios";
import { useState, useEffect } from "react";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handleUsername = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handlePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
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
    Cookies.set("Login", data.token, { expires: 30 });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <p>
          <span>
            <input type="checkbox"></input>
            S'inscrire à notre Newsletter
          </span>
        </p>
        <p>
          En m'inscrivant, je confirme que j'ai accepté les Termes et Conditions
          de Vinted, avoir lu la Politique de Confidentialité, et que j'ai plus
          de 18 ans.
        </p>
        <button type="Submit">Envoyer</button>
      </form>
      {!isLoading && (
        <div>
          {console.log("mes données :", data)} "hello :" {data.token}
        </div>
      )}
    </div>
  );
};

export default SignUp;
