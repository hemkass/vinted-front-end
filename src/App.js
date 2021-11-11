import "./App.css";
import "../src/css/home.css";
import "../src/css/fonts.css";

import Home from "./pages/Home";
import Header from "./components/Header";
import Product from "./pages/Product";
import SignUp from "./components/Signup";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faEnvelope } from "@fortawesome/free-solid-svg-icons";

library.add(faSearch, faEnvelope);

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Header />
        <nav></nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
