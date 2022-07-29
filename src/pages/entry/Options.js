import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOptions from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import { Row } from "react-bootstrap";

const Options = ({ optionType }) => {
  const [items, setItmes] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItmes(response.data))
      .catch((error) => {
        // TODO: error to catch
      });
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOptions : ToppingOption;

  const optionItems = items.map((el) => (
    <ItemComponent key={el.name} name={el.name} imagePath={el.imagePath} />
  ));

  return <Row>{optionItems}</Row>;
};

export default Options;
