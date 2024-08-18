import React from "react";
import { render, screen } from "@testing-library/react";
import UserDetails from "./UserDetails";
import { getRandomColor } from "../../utilities/common";

// Mock the getRandomColor function
jest.mock("../../utilities/common", () => ({
  getRandomColor: jest.fn(),
}));

describe("UserDetails Component", () => {
  const mockUser = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
  };

  const mockColor = "#123456";

  beforeEach(() => {
    // Mock the color returned by getRandomColor
    (getRandomColor as jest.Mock).mockReturnValue(mockColor);
  });

  test("renders the user details correctly in grid view", () => {
    render(
      <UserDetails
        firstName={mockUser.firstName}
        lastName={mockUser.lastName}
        email={mockUser.email}
        isGridView={true}
      />
    );

    // Check if initials are rendered correctly
    expect(screen.getByText("JD")).toBeInTheDocument();

    // Check if the user's full name is rendered correctly
    expect(
      screen.getByText(`${mockUser.firstName} ${mockUser.lastName}`)
    ).toBeInTheDocument();

    // Check if the user's email is rendered correctly
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();

    // Check if the avatar background color is set correctly
    expect(screen.getByText("JD").parentElement).toHaveStyle(
      `background-color: ${mockColor}`
    );
  });

  test("renders the user details correctly in list view", () => {
    render(
      <UserDetails
        firstName={mockUser.firstName}
        lastName={mockUser.lastName}
        email={mockUser.email}
        isGridView={false}
      />
    );

    // Check if initials are rendered correctly
    expect(screen.getByText("JD")).toBeInTheDocument();

    // Check if the user's full name is rendered correctly
    expect(
      screen.getByText(`${mockUser.firstName} ${mockUser.lastName}`)
    ).toBeInTheDocument();

    // Check if the user's email is rendered correctly
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();

    // Check if the avatar background color is set correctly
    expect(screen.getByText("JD").parentElement).toHaveStyle(
      `background-color: ${mockColor}`
    );
  });
});
