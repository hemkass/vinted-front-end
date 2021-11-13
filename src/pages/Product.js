import { useParams } from "react-router-dom";
import "../App.css";

import "../css/fonts.css";
import "../css/productById.css";
import "~react-image-gallery/styles/css/image-gallery.css";

import axios from "axios";
import { useState, useEffect } from "react";

import ImageGallery from "react-image-gallery";

const Product = () => {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const imagesGallery = [];
  for (let i = 4; i < data.product_image.length; i++) {
    imagesGallery.push({ original: data.product_image[i].secure_url });
  }
  console.log(imagesGallery);

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
          {data.product_image[0] &&
            data.product_image.map((elem, index) => {
              return index < 4 ? (
                <div key={elem.asset_id}>
                  <img
                    onClick=""
                    src={elem.secure_url}
                    alt="différentes vues du produit"
                  />
                </div>
              ) : (
                class MyGallery extends React.Component {
                  render() {
                    return <ImageGallery items={imagesGallery} />;
                  }
                }
              );
            })}
        </div>
      </div>
      <div className="productDetails">
        <div className="details">
          <h3>{Number(data.product_price).toFixed(2)} €</h3>
          {data.product_details.map((elem, index) => {
            const keys = Object.keys(elem);

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
                <img src={data.owner.account.avatar} />
              </span>
              <span>{data.owner.account.username}</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
