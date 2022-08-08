import { useEffect, useState } from "react";
import axios from "axios";
import { useOrderDetails } from "../../contexts/OrderDetails";
import AlertBanner from "../common/AlertBanner";

function OrderConfirmation({ setOrderPhase }) {
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState("");
  const [, , resetOrder] = useOrderDetails();

  useEffect(() => {
    axios
      .post("http://localhost:3030/orders")
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch((e) => setError(e));
  }, []);

  const handleClick = () => {
    resetOrder();
    setOrderPhase("inProgress");
  };

  const orderNumberContent = (
    <div>
      <h2>Thank you!</h2>
      <p>Your order number is ${orderNumber}</p>
      <button onClick={handleClick}>Create new order</button>
    </div>
  );

  const orderNumberRender = orderNumber ? (
    orderNumberContent
  ) : (
    <div>Loading...</div>
  );

  if (error) {
    return <AlertBanner />;
  }

  return orderNumberRender;
}

export default OrderConfirmation;
