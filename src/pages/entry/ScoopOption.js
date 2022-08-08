import { useState } from "react";
import { Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Row } from "react-bootstrap";

const ScoopOptions = ({ name, imagePath, updateItemCount }) => {
  const [isValid, setIsValid] = useState(true);
  const handleChange = (e) => {
    const currentValue = e.target.value;

    const currentValueFloat = parseFloat(currentValue);

    const valueIsValid =
      0 <= currentValueFloat &&
      currentValueFloat <= 10 &&
      Math.floor(currentValueFloat) === currentValueFloat;
    setIsValid(valueIsValid);
    if (valueIsValid) {
      updateItemCount(name, currentValue);
    }
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column cs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
            className={isValid ? "" : "is-invalid"}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ScoopOptions;
