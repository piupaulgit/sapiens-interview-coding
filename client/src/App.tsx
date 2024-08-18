import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import UserList from "./pages/UserList/UserList";
import AddUser from "./pages/AddUser/AddUser";
import { ToastContainer } from "react-toastify";
import NotFound from "./pages/NotFound/NotFound";

const App: React.FC = () => {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className=" bg-white rounded shadow w-[80%]">
          <main>
            <Routes>
              <Route path="/" element={<UserList />} />
              <Route path="/add-user" element={<AddUser />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
