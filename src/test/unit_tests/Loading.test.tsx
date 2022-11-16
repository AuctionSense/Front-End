import { act, render, screen } from "@testing-library/react";
import Loading, { LoadingObject } from "../../components/Loading";

test("Assert text of loading h1 element.", async () => {
    // Arrange
    render(
        <Loading />
    );

    let h1Loading;
  
    // Act
    await act(async () => {
      h1Loading = screen.getByText("Loading...");
    })
  
    // Assert
    expect(h1Loading).toBeInTheDocument();
  });

  test("Assert text of loading p element.", async () => {
    // Arrange
    render(
        <LoadingObject />
    );

    let pLoading;
  
    // Act
    await act(async () => {
      pLoading = screen.getByText("Loading...");
    })
  
    // Assert
    expect(pLoading).toBeInTheDocument();
  });