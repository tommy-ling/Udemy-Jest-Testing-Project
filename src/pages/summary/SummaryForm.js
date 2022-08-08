import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Popover } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const SummaryForm = ({ setOrderPhase }) => {
  const [checked, setChecked] = useState(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderPhase("completed");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!checked}>
        Confirm Order
      </Button>
    </Form>
  );
};

export default SummaryForm;
