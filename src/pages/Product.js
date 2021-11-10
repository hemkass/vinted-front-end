import { useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  console.log({ id });
  return <div></div>;
};

export default Product;
