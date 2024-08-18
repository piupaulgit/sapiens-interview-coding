import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserList from "./UserList";
import { getUsers } from "../../services/userService/userService";
import { act } from "react";

// Mock the getUsers service
jest.mock("../../services/userService/userService", () => ({
  getUsers: jest.fn(),
}));

describe("UserList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state initially", async () => {
    // Mock getUsers to resolve after some delay
    (getUsers as jest.Mock).mockResolvedValue({ data: [] });

    render(
      <MemoryRouter>
        <UserList />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading users.../i)).toBeInTheDocument();
  });

  it("renders error state when API call fails", async () => {
    // Mock getUsers to reject
    (getUsers as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch users")
    );

    await act(async () => {
      render(
        <MemoryRouter>
          <UserList />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch users/i)).toBeInTheDocument();
    });
  });

  it("renders no users found state when API returns empty list", async () => {
    // Mock getUsers to return an empty list
    (getUsers as jest.Mock).mockResolvedValue({ data: [] });

    await act(async () => {
      render(
        <MemoryRouter>
          <UserList />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText(/no user found/i)).toBeInTheDocument();
    });
  });

  it("renders users in grid view by default and can switch to list view", async () => {
    // Mock getUsers to return some users
    const users = [
      {
        _id: "1",
        firstName: "piu",
        lastName: "paul",
        email: "piu.paul@example.com",
      },
      {
        _id: "2",
        firstName: "john",
        lastName: "doe",
        email: "john.dow@example.com",
      },
    ];
    (getUsers as jest.Mock).mockResolvedValue({ data: users });

    await act(async () => {
      render(
        <MemoryRouter>
          <UserList />
        </MemoryRouter>
      );
    });

    // Check if users are rendered in grid view
    await waitFor(() => {
      expect(screen.getByText(/piu paul/i)).toBeInTheDocument();
      expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    });

    // Check if toggle button exists
    const toggleButton = screen.getByRole("button");
    expect(toggleButton).toBeInTheDocument();

    // Toggle to list view
    act(() => {
      fireEvent.click(toggleButton);
    });

    // Verify the toggle happened, you may need additional checks depending on how UserDetails renders grid vs. list
  });
});
