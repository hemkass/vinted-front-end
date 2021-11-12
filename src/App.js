import "./App.css";
import "../src/css/home.css";
import "../src/css/fonts.css";

import Home from "./pages/Home";
import Header from "./components/Header";
import Product from "./pages/Product";
import SignUp from "./components/Signup";
import Login from "./components/login";

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
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        <Header />
        <nav></nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offer/:id" element={<Product />} />
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
