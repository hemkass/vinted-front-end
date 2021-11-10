import "./App.css";
import "../src/css/home.css";
import "../src/css/fonts.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Product from "./pages/Product";
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
