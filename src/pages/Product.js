import { useParams } from "react-router-dom";
const Product = () => {
  const { productID } = useParams();
  <div>
    Product Page
    <br />
    L'id sur lequel j'ai cliqué est : {productID}
  </div>;
};

export default Product;
