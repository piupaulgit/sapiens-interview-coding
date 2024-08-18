import React from "react";

interface INotificationProps {
  message: string;
}

const Notification: React.FC<INotificationProps> = ({ message }) => {
  return (
    <div className=" bg-red-300 text-white p-3 rounded-md">
      <h3>{message}</h3>
    </div>
  );
};

export default Notification;
