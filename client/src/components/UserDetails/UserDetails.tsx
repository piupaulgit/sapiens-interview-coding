import React from "react";
import { IUser } from "../../interfaces/user";
import { getRandomColor } from "../../utilities/common";

interface IUserDetailsProps extends IUser {
  isGridView: boolean;
}

const UserDetails: React.FC<IUserDetailsProps> = ({
  firstName,
  lastName,
  email,
  isGridView,
}) => {
  const avatarColor = getRandomColor();
  return (
    <div
      className={`p-4 bg-gray-100 rounded-lg border-1 self-baseline ${
        isGridView ? "w-[100%] lg:w-[32%] md:w-[48%] sm:w-[100%]" : "w-[100%]"
      }`}
    >
      <div className="flex items-center space-x-4">
        <div
          style={{ backgroundColor: avatarColor }}
          className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl`}
        >
          <h3 className="uppercase">
            {firstName.charAt(0)}
            {lastName.charAt(0)}
          </h3>
        </div>
        <div>
          <h2
            className="text-md font-bold truncate max-w-[20ch] capitalize"
            title={`${firstName} ${lastName}`}
          >
            {firstName} {lastName}
          </h2>
          <p className="text-gray-600 truncate max-w-[20ch]" title={email}>
            {email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
