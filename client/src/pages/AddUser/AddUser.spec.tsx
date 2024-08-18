import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { act } from "react";
import AddUser from "./AddUser";
import { addUser } from "../../services/userService/userService";
import { toast } from "react-toastify";

// Mock the addUser service and toast notifications
jest.mock("../../services/userService/userService", () => ({
  addUser: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("AddUser Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form and submits user data", async () => {
    // Mock successful response from addUser
    (addUser as jest.Mock).mockResolvedValue({
      status: "success",
      message: "User added successfully",
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <AddUser />
        </MemoryRouter>
      );
    });

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "piu" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "paul" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "piu.paul@gmail.com" },
    });

    // Submit the form
    fireEvent.submit(screen.getByRole("button", { name: /Submit/i }));

    // Wait for the success toast and form reset
    await waitFor(() => {
      expect(addUser).toHaveBeenCalledWith({
        firstName: "piu",
        lastName: "paul",
        email: "piu.paul@gmail.com",
      });
      expect(toast.success).toHaveBeenCalledWith("User added successfully");
    });

    // Ensure the form is reset
    expect(screen.getByLabelText(/First Name/i)).toHaveValue("");
    expect(screen.getByLabelText(/Last Name/i)).toHaveValue("");
    expect(screen.getByLabelText(/Email/i)).toHaveValue("");
  });

  it("shows error toast on failure", async () => {
    // Mock error response from addUser
    (addUser as jest.Mock).mockRejectedValue(new Error("Failed to add user"));

    await act(async () => {
      render(
        <MemoryRouter>
          <AddUser />
        </MemoryRouter>
      );
    });

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "piu" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "paul" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "piu.paul@gmail.com" },
    });

    // Submit the form
    fireEvent.submit(screen.getByRole("button", { name: /Submit/i }));

    // Wait for the error toast
    await waitFor(() => {
      expect(addUser).toHaveBeenCalledWith({
        firstName: "piu",
        lastName: "paul",
        email: "piu.paul@gmail.com",
      });
      expect(toast.error).toHaveBeenCalledWith("Failed to add user");
    });
  });
});
