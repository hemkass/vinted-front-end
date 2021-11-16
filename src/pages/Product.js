import { useParams } from "react-router-dom";
//import ImageGallery from "react-image-gallery";
//import React from "react";
//import ReactDOM from "react-dom";

import "../App.css";

import "../css/fonts.css";
import "../css/productById.css";
import "../components/login";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useState, useEffect } from "react";

const Product = ({ setLogin }) => {
  const token = Cookies.get("Login");
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleBuy = () => {
    if (token) {
      //cookie  me permettant de transmettre l'id du produit vers le paiement
      Cookies.set("offer", data._id, { expires: 30 });
      navigate("/payment");
    } else {
      setLogin(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://myvintedapp.herokuapp.com/offer/${id}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>en cours de chargement</p>
  ) : (
    <div className="content">
      <div>
        <h3>{data.product_name}</h3>
        <div
          className={
            data.product_image.length <= 3 ? "caroussel" : "grandcaroussel"
          }
        >
          {" "}
          {/* Cas où il y a plusieurs image et donc data.product_image est un tableau */}
          {data.product_image[0]
            ? data.product_image.map((elem, index) => {
                return (
                  index < 5 && (
                    <div key={elem.asset_id}>
                      <img
                        src={elem.secure_url}
                        alt="différentes vues du produit"
                      />
                    </div>
                  )
                );
              }) /* Cas où il y a qu'une image et donc data.product_image n'est pas un tableau */
            : data.product_image && (
                <div>
                  <img
                    src={data.product_image.secure_url}
                    alt="différentes vues du produit"
                  />
                </div>
              )}
        </div>
      </div>
      <div className="productDetails">
        <div className="details">
          <h3>{Number(data.product_price).toFixed(2)} €</h3>
          {data.product_details.map((elem, index) => {
            const keys = Object.keys(elem);
            console.log("mon cookie", data);

            return (
              <p key={index}>
                <span className="key">{keys[0]} :</span>
                <span className="details"> {elem[keys[0]]}</span>
              </p>
            );
          })}
        </div>
        <div>
          <p>{data.product_name}</p>
        </div>
        <div>
          <p>{data.product_description}</p>
        </div>
        <div>
          <p className="avatar">
            {" "}
            <span>
              <span>
                <img
                  src={data.owner.account.avatar}
                  alt="avatar de l'utilisateur"
                />
              </span>
              <span>{data.owner.account.username}</span>
            </span>
          </p>
        </div>
        <div className="buy">
          <button onClick={handleBuy}>achetez</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
