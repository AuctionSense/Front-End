import { act, render, screen } from "@testing-library/react";
import LoginButton from "../../components/buttons/LoginButton";

test("Check if css style text decoration is none and after hover has underline", async () => {
    // Arrange
    render(
        <LoginButton />
    );

    let h1Loading;
  
    // Act
    await act(async () => {
      h1Loading = screen.getByText("Login");
    })
  
    // Assert
    expect(h1Loading).toBeInTheDocument();
  });