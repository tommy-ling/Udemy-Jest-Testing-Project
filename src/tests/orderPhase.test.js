import { render, screen } from "../test-utils/test-library-utils";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  // render app
  render(<App />);

  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");

  const chocolateInput = screen.getByRole("spinbutton", { name: "Chocolate" });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesCheckbox);

  // find and click order button
  const orderSummaryButton = screen.getByRole("button", {
    name: "Order sundae",
  });
  userEvent.click(orderSummaryButton);

  // check summary info based on order
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $6.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingsHeading).toBeInTheDocument();

  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  // accpet t&c and click button to confirm order
  const tcCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  userEvent.click(tcCheckbox);

  const confirmOrderButton = screen.getByRole("button", {
    name: "Confirm Order",
  });
  userEvent.click(confirmOrderButton);

  // Loading text
  const loadingText = screen.getByText("Loading...");
  expect(loadingText).toBeInTheDocument();

  // confirm order number on confirmation page
  const tyHeader = await screen.findByRole("heading", { name: "Thank you!" });
  expect(tyHeader).toBeInTheDocument();
  const loadingTextNot = screen.queryByText("Loading...");
  expect(loadingTextNot).not.toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // click new order button on confirmation page
  const newOrderButton = screen.getByRole("button", {
    name: "Create new order",
  });
  userEvent.click(newOrderButton);

  // check that scoops and toppings subtotals have been reset
  const scoopsTotal = screen.getByText("Scoops total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = screen.getByText("Toppings total: $0.00");
  expect(toppingsTotal).toBeInTheDocument();

  // the below lines are to make sure testing lib doesn't get angry when
  // app updates after the test exits
  await screen.findByRole("spinbutton", { name: "Vanilla" });
  await screen.findByRole("checkbox", { name: "Cherries" });
});

test("toppings header not on summary page if no toppings ordered", async () => {
  render(<App />);

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");

  const chocolateInput = screen.getByRole("spinbutton", { name: "Chocolate" });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");

  const orderSummaryButton = screen.getByRole("button", {
    name: "Order sundae",
  });
  userEvent.click(orderSummaryButton);

  // check summary info based on order
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $6.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.queryByRole("heading", {
    name: /toppings/i,
  });
  expect(toppingsHeading).not.toBeInTheDocument();
});
