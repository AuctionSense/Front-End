import { act, render, screen } from "@testing-library/react";
import App from "../../App";
import { BrowserRouter } from "react-router-dom";

test("On render login button is active.", async () => {
  // Arrange
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  let inputBalance;

  // Act
  await act(async () => {
    inputBalance = screen.getByTestId("login-button");
  })

  // Assert
  expect(inputBalance).toBeInTheDocument();
});