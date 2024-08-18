import React, { useState } from "react";
import { IUser } from "../../interfaces/user";
import { addUser } from "../../services/userService/userService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AddUser: React.FC = () => {
  const cleanForm: IUser = {
    firstName: "",
    lastName: "",
    email: "",
  };

  const [formValues, setFormValues] = useState<IUser>(cleanForm);
  const [loading, setLoading] = useState<boolean>(false);

  const { firstName, lastName, email } = formValues;
  const isFormValid = firstName && lastName && email;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await addUser(formValues);
      response.status === "success" && toast.success(response.message);
      setFormValues(cleanForm);
    } catch (error) {
      toast.error("Failed to add user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="bg-blue-600 w-full md:w-[50%] rounded-tl-md rounded-bl-md flex items-center justify-center p-4 md:p-0">
        <h2 className="font-semibold text-slate-200 text-3xl md:text-4xl uppercase text-center sm:text-md">
          Add new user
        </h2>
      </div>
      <div className="flex justify-center items-center w-full md:w-[50%] py-10">
        <form
          onSubmit={handleSubmit}
          className="w-[90%] sm:w-[70%] mx-auto px-4 py-2 bg-white"
        >
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-gray-700 font-medium mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={formValues.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-gray-700 font-medium mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={formValues.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            disabled={!isFormValid || loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-5 disabled:opacity-50"
          >
            {loading ? "Please wait..." : "Submit"}
          </button>
          <div className="flex justify-center mt-3">
            <Link
              to="/"
              className="text-blue-600 underline hover:decoration-none"
            >
              Click here to see User List
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
