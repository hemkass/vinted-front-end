import { useState } from "react";
import axios from "axios";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import "../App.css";
import "../css/payment.css";
import "../css/fonts.css";

const CheckoutForm = ({ price, description, userId, Offer_id }) => {
  const stripe = useStripe();
  const elements = useElements();

  //Etat qui vérifie si le paiement a été validé
  const [valid, setValid] = useState(false);
  const frais = (Number(price) * 0.04).toFixed(2);
  const port = (Number(price) * 0.08).toFixed(2);
  const total = (Number(price) + Number(frais) + Number(port)).toFixed(2);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // Etape 1 : on récupère les infos de l'utilisateur pour transmettre à Stripe :
      const CardElements = elements.getElement(CardElement);
      // Etape 2 : envoyer les infos à l'API stripe
      const stripeResponse = await stripe.createToken(CardElements, {
        name: userId,
      });
      // Etape 3 : je vérifie de bien recevoir le token : console.log(stripeResponse.token.id);
      // Etape 4 : J'envoie le strikeToken à mon serveur:
      const response = await axios.post("http://localhost:4000/payment", {
        stripeToken: stripeResponse.token.id,
        product_Price: Number(price),
        product_Description: description,
        Offer_id: Offer_id,
      });
      if (response.status === 200) {
        setValid("Paiement validé !");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="PaymentTitle">
        <h3>Recapitulatif de votre commande</h3>
      </div>
      <div className="Paymentfees">
        <div>
          <p>
            <span>Commande : </span>
            <span>{price} €</span>
          </p>
        </div>
        <div>
          <p>
            <span>Frais de gestion :</span>
            <span>{frais} €</span>
          </p>
        </div>
        <div>
          <p>
            <span> Frais de port : </span>
            <span>{port} €</span>
          </p>
        </div>
      </div>
      <div className="PaymentTotal">
        <p>
          <span>Total: </span>
          <span>{total} €</span>
        </p>
      </div>
      <div>
        <span className="PaymentBlabla">
          Il ne vous reste plus qu'une étape pour vous offrir{" "}
          <b>{description}.</b> Vous allez être débité de <b>{total} € </b>{" "}
          (Tous frais inclus)
        </span>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <div className="cardElement">
          <CardElement />
        </div>
        <div className="PaymentButton">
          <button type="submit">Payer</button>
        </div>
        <span>{valid}</span>
      </form>
    </div>
  );
};

export default CheckoutForm;
