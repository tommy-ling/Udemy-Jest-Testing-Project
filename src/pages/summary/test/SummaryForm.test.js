import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("checkbox unchecked by default", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  expect(checkbox).not.toBeChecked();

  const button = screen.getByRole("button", { name: "Confirm Order" });
  expect(button).toBeDisabled();
});

test("checking checkbox enables button and checking again disables it", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  const button = screen.getByRole("button", { name: "Confirm Order" });

  userEvent.click(checkbox);
  expect(button).toBeEnabled();

  userEvent.click(checkbox);
  expect(button).toBeDisabled();
});

test("popover response to hover", async () => {
  render(<SummaryForm />);
  const nullPopover = screen.queryByText(
    "No ice cream will actually be delivered"
  );
  expect(nullPopover).not.toBeInTheDocument();

  const termsAndConditions = screen.getByText("Terms and Conditions");
  userEvent.hover(termsAndConditions);
  const popover = screen.getByText("No ice cream will actually be delivered");
  expect(popover).toBeInTheDocument();

  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText("No ice cream will actually be delivered")
  );
});
