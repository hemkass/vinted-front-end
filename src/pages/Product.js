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
    <div>
      <h3>{data.product_name}</h3>
      <div></div>
      <div>
        {data.product_details.map((elem, id) => {
          const keys = Object.keys(elem);
          console.log("hello", keys);
          return (
            <li>
              <span>{keys[0]} :</span>
              <span> {elem.[keys[0]]}</span>
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default Product;
