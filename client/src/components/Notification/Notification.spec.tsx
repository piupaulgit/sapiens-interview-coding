import React from "react";
import { render, screen } from "@testing-library/react";
import Notification from "./Notification";

describe("Notification Component", () => {
  test("renders the notification message correctly", () => {
    const testMessage = "This is a test notification";

    render(<Notification message={testMessage} />);

    // Assert that the notification message is rendered
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });
});
