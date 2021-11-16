import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Cookies from "js-cookie";
import CheckoutForm from "../components/CheckoutForm";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import "../App.css";
import "../css/payment.css";
import "../css/fonts.css";

// Pour le paiement :

const Payment = () => {
  const token = Cookies.get("Login");
  const id = Cookies.get("offer");
  //console.log(id);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(true);
  const [user, setUser] = useState("");

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

  useEffect(() => {
    const fetchOwnerId = async () => {
      try {
        //console.log(token);
        const response = await axios.get(
          // `http://localhost:4000/user/${token}`

          `https://myvintedapp.herokuapp.com/user/:token`
        );
        // console.log(response.data);
        setUser(response.data);
        console.log("user", user);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchOwnerId();
  }, [token]);

  //console.log("mon id", user._id);
  const stripePromise = loadStripe(
    "pk_test_51JwQVHFJWKpU9ZBkI0duwoiShV0kHnRhlRaFOJzfJBmlxgwhJSEIC6VBZ7h44ACjoEWz8NCeeyuvDTDkZ3C8KrDr00XUE24nD7"
  );
  //console.log(data);
  // console.log("hello", user);
  return token ? (
    isLoading ? (
      <p>en cours de chargement</p>
    ) : (
      <div className="paymentWrapper">
        <Elements stripe={stripePromise} className="cardElement">
          <CheckoutForm
            price={data.product_price}
            description={data.product_name}
            userId={user._id}
            Offer_id={data._id}
          />
        </Elements>
      </div>
    )
  ) : (
    <Navigate to={`/offer/${id}`} />
  );
};

export default Payment;
