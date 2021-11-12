import { useParams } from "react-router-dom";
import "../App.css";
import "../css/home.css";
import "../css/fonts.css";

import axios from "axios";
import { useState, useEffect } from "react";

const Product = () => {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
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
    <div>
      <h3>{data.product_name}</h3>
      <div></div>
    </div>
  );
};

export default Product;
