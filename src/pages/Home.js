import "../App.css";
import "../css/home.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productID, setProductID] = useState();

  const handleProduct = (id) => {
    setProductID(id);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
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
        <img
          src="https://res.cloudinary.com/dyj84szrx/image/upload/v1636548475/vinted/banner/banner_qh1mm6.jpg"
          alt="banner"
        ></img>
      </div>
      <div className="homeContent">
        <div className="picture">
          {data.offers.map((elem, index) => {
            return (
              <div key={elem.id}>
                {elem.product_pictures.map((item, index) => {
                  return (
                    <div key={index}>
                      <img src={item.url} alt="descriptif du produit" />
                    </div>
                  );
                })}
              </div>
            );
          })}{" "}
        </div>

        <div>
          {data.offers.map((elem, index) => {
            setProductID(elem.id);
            return (
              <Link to={`/product/${productID}`}>
                {" "}
                <div onClick={() => handleProduct(elem.id)}>
                  <p>{elem.product_price} €</p>
                  <p key={elem.id}>
                    {elem.product_details.map((item) => {
                      return (
                        <>
                          <p>{item.MARQUE}</p>
                          <p>{item.TAILLE}</p>
                        </>
                      );
                    })}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
