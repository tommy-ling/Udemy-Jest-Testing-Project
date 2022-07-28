import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOptions from "./ScoopOption";
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

  // null to be replaced with ToppingOptions once available
  const ItemComponent = optionType === "scoops" ? ScoopOptions : null;

  const optionItems = items.map((el) => (
    <ItemComponent key={el.name} name={el.name} imagePath={el.imagePath} />
  ));

  return <Row>{optionItems}</Row>;
};

export default Options;
