import { render, screen } from "@testing-library/react";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

test("On render the test button is not active", async () => {
  // Arrange
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // Act
  expect(await screen.findByRole("button", { name: /test/i })).toBeDisabled;
  // Assert
});
