import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import BalancePage from "../../pages/Balance";

test("Render balance input and check attributes.", async () => {
  // Arrange
  const pull_error = (error: Error) => {};

  render(
    <BrowserRouter>
      <BalancePage setError={pull_error} />
    </BrowserRouter>
  );

  // Act
  const inputBalance = screen.getByTestId("balance-input");

  // Assert
  expect(inputBalance).toBeInTheDocument();
});

test("Render submit button for balance form.", async () => {
  // Arrange
  const pull_error = (error: Error) => {};

  render(
    <BrowserRouter>
      <BalancePage setError={pull_error} />
    </BrowserRouter>
  );

  // Act
  const submitButton = screen.getByTestId("form-submit-button");

  // Assert
  expect(submitButton).toBeInTheDocument();
});

test("Pass an invalid amount to test balance input field.", async () => {
  // Arrange
  const pull_error = (error: Error) => {};

  render(
    <BrowserRouter>
      <BalancePage setError={pull_error} />
    </BrowserRouter>
  );

  let inputBalance;
  let submitButton;

  // Act
  await act(async () => {
    inputBalance = screen.getByTestId("balance-input");
    submitButton = screen.getByTestId("form-submit-button");
    userEvent.type(inputBalance, "2");
    userEvent.click(submitButton);
  });

  //Assert
  expect(inputBalance).toBeInvalid();
});
