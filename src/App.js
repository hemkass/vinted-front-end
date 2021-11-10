import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Product from "./pages/Product";

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Header />
        <nav>
          <ul>
            <li>
              <Link to="/product/:id">go to product</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>{" "}
      </Router>
    </div>
  );
}

export default App;
