import axios from "axios";
import { addUser, getUsers } from "./userService";

// Mock the axios module
jest.mock("axios");

describe("User Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("addUser", () => {
    it("should successfully add a user", async () => {
      const mockResponse = {
        status: "success",
        message: "User added successfully",
      };
      (axios.post as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

      const formData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
      };
      const result = await addUser(formData);

      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:4000/user/add",
        formData
      );
      expect(result).toEqual(mockResponse);
    });

    it("should throw an error if adding a user fails", async () => {
      const mockError = new Error("Failed to add user");
      (axios.post as jest.Mock).mockRejectedValueOnce(mockError);

      const formData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
      };
      await expect(addUser(formData)).rejects.toThrow("Failed to add user");

      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:4000/user/add",
        formData
      );
    });
  });

  describe("getUsers", () => {
    it("should successfully fetch users", async () => {
      const mockUsers = [
        {
          _id: "1",
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
        },
      ];
      (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockUsers });

      const result = await getUsers();

      expect(axios.get).toHaveBeenCalledWith("http://localhost:4000/user");
      expect(result).toEqual(mockUsers);
    });

    it("should throw an error if fetching users fails", async () => {
      const mockError = new Error("Failed to fetch users");
      (axios.get as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(getUsers()).rejects.toThrow("Failed to fetch users");
      expect(axios.get).toHaveBeenCalledWith("http://localhost:4000/user");
    });
  });
});
