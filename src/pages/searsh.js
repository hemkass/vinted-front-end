import "../css/home.css";
import "../css/fonts.css";
import "../App.css";

import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home2 = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let filter = {};
  const src = "https://myvintedapp.herokuapp.com/offers?page=1&limit=12";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(src);
        //lereacteur-vinted-api.herokuapp.com/offers?page=1&limit=8
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>en cours de chargement</p>
  ) : (
    <div>
      <div className="banner">
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
        <div className="leftside">
          <div className="homeContent">
            <h2>Articles populaires</h2>
            <div className="picture">
              {data.offers.map((offer, index) => {
                return (
                  offer.product_image[0] && (
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

export default Home2;
