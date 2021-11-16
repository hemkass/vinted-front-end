import "./App.css";
import "../src/css/home.css";
import "../src/css/fonts.css";

import Home from "./pages/Home";
import Header from "./components/Header";
import Product from "./pages/Product";
import SignUp from "./components/Signup";
import Login from "./components/login";
import Publish from "./pages/publish";
import Payment from "./pages/payment";

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faEnvelope,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

library.add(faSearch, faEnvelope, faTimes);

function App() {
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [priceMax, setPriceMax] = useState(500);
  const [priceMin, setPriceMin] = useState(0);
  const [sort, setSort] = useState("price-desc");

  // Pour gérer Login et Signin
  const handleUsername = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handleEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  return (
    <div className="wrapper">
      <Router>
        <Header
          login={login}
          setLogin={setLogin}
          signUp={signUp}
          setSignUp={setSignUp}
          title={title}
          setTitle={setTitle}
          setPriceMax={setPriceMax}
          priceMax={priceMax}
          setPriceMin={setPriceMin}
          priceMin={priceMin}
          setSort={setSort}
          sort={sort}
        />
        <nav></nav>

        <Routes>
          <Route
            path="/"
            element={
              <Home
                login={login}
                setLogin={setLogin}
                signUp={signUp}
                setSignUp={setSignUp}
                title={title}
                priceMax={priceMax}
                priceMin={priceMin}
                sort={sort}
              />
            }
          />
          <Route path="/offer/:id" element={<Product setLogin={setLogin} />} />
          <Route
            path="/signup"
            element={
              <SignUp
                handlePassword={handlePassword}
                handleEmail={handleEmail}
                handleUsername={handleUsername}
                username={username}
                setUsername={setUsername}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                handleEmail={handleEmail}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
              />
            }
          />
          <Route path="/publish" element={<Publish />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
