import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOptions from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import { Row } from "react-bootstrap";
import AlertBanner from "../common/AlertBanner";

const Options = ({ optionType }) => {
  const [items, setItmes] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItmes(response.data))
      .catch((error) => {
        setError(true);
      });
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === "scoops" ? ScoopOptions : ToppingOption;

  const optionItems = items.map((el) => (
    <ItemComponent key={el.name} name={el.name} imagePath={el.imagePath} />
  ));

  return <Row>{optionItems}</Row>;
};

export default Options;
