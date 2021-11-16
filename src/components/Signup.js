import "../App.css";
import "../css/form.css";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";
import { useState } from "react";

const SignUp = ({ className, setConnected, setSignUp }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => {
    setSignUp(false);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://myvintedapp.herokuapp.com/user/signup",
        {
          email: `${email}`,
          username: `${username}`,
          password: `${password}`,
        }
      );
      console.log(response);
      if (response.data.token) {
        setIsLoading(false);
        console.log(response.data);

        setSignUp(false);
      }
    } catch (error) {
      setError("Not authorized");
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
          onChange={(event) => setUsername(event.target.value)}
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
        ></input>
        <input
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          placeholder="Email"
          value={email}
        ></input>
        <input
          onChange={(event) => setPassword(event.target.value)}
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
      <div>
        <span className="error">{error}</span>
      </div>
    </div>
  );
};

export default SignUp;
