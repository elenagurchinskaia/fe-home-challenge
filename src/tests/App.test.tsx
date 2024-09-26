import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom";

describe("App Component", () => {
  it("renders todo list heading", () => {
    render(<App />);
    const heading = screen.getByText(/todo list example/i);
    expect(heading).toBeTruthy();
  });
});
