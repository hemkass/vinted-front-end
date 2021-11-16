import "../css/home.css";
import "../css/fonts.css";
import "../App.css";
import Cookies from "js-cookie";

import axios from "axios";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Home = ({
  title,
  priceMin,
  priceMax,
  sort,

  setLogin,
  login,
}) => {
  const token = Cookies.get("Login");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleSale = () => {
    if (token) {
      navigate("/publish");
    } else {
      setLogin(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log({ priceMax });
        console.log({ priceMin });
        const response = await axios.get(
          `https://myvintedapp.herokuapp.com/offers?title=${title}&sort=${sort}&priceMin=${priceMin}&priceMax=&${priceMax}&limit=20`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [title, sort, priceMax, priceMin]);

  return isLoading ? (
    <p>en cours de chargement</p>
  ) : (
    <div className="wrapper">
      <div className="banner">
        <div className="calltoAction">
          <h2>Prêts à faire du tri dans vos placards ?</h2>
          <div className="sellButton">
            <button onClick={handleSale}> vends maintenant</button>
          </div>
        </div>
        <div>
          <img
            className="bannereffect"
            src="https://res.cloudinary.com/dyj84szrx/image/upload/v1636573152/vinted/banner/papier_qurkdd.png"
            alt="banner"
          ></img>

          <img
            className="bannerImg"
            src="https://res.cloudinary.com/dyj84szrx/image/upload/v1636548475/vinted/banner/banner_qh1mm6.jpg"
            alt="banner"
          ></img>
        </div>
      </div>
      <main>
        <div>
          <div>
            <h2>Articles populaires</h2>
            <div className="picture">
              {data.offers.map((offer, index) => {
                return offer.product_image[0] ? (
                  <div className="test" key={offer._id}>
                    <Link to={`/offer/${offer._id}`}>
                      <img
                        src={offer.product_image[0].secure_url}
                        alt="descriptif du produit"
                      />
                      <p className="productPrice">{offer.product_price} €</p>
                      {offer.product_details.map((item, i) => {
                        return (
                          <div key={i}>
                            <p className="itemDetails">
                              {item.TAILLE}
                              {item.MARQUE}
                            </p>
                          </div>
                        );
                      })}
                    </Link>
                  </div>
                ) : (
                  offer.product_image && (
                    <div key={offer._id}>
                      <div className="test">
                        <Link to={`/offer/${offer._id}`}>
                          <img
                            src={offer.product_image.secure_url}
                            alt="descriptif du produit"
                          />
                          <p className="productPrice">
                            {offer.product_price} €
                          </p>
                          {offer.product_details.map((item, i) => {
                            return (
                              <div key={i}>
                                <p className="itemDetails">
                                  {item.TAILLE}
                                  {item.MARQUE}
                                </p>
                              </div>
                            );
                          })}
                        </Link>
                      </div>{" "}
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>
        <div className="rightSide"></div>
      </main>
    </div>
  );
};

export default Home;
