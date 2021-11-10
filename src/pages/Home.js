import "../App.css";
import "../css/home.css";
import "../css/fonts.css";

import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers?page=1&limit=8"
        );
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
    <>
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
        <content>
          <div className="leftside">
            <div className="homeContent">
              <div className="picture">
                {data.offers.map((elem, index) => {
                  return (
                    elem.product_pictures[0] && (
                      <div className="test" key={elem._id}>
                        <Link to={`/product/${elem._id}`}>
                          <img
                            src={elem.product_pictures[0].url}
                            alt="descriptif du produit"
                          />
                          <p className="productPrice">{elem.product_price} €</p>
                          {elem.product_details.map((item, i) => {
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
        </content>
      </main>
    </>
  );
};

export default Home;
