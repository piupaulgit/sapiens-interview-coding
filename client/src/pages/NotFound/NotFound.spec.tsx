import { render, screen } from "@testing-library/react";
import { act } from "react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "./NotFound";

describe("NotFound Component", () => {
  it("renders the 404 message and link", () => {
    act(() => {
      render(
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>
      );
    });

    // Check if the heading is rendered
    const heading = screen.getByRole("heading", {
      name: /404 - Page Not Found/i,
    });
    expect(heading).toBeInTheDocument();

    // Check if the message is rendered
    const message = screen.getByText(
      /Oops! The page you're looking for doesn't exist./i
    );
    expect(message).toBeInTheDocument();

    // Check if the link is rendered and points to the home page
    const link = screen.getByRole("link", { name: /Go back to Home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
