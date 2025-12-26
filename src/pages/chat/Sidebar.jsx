import React from "react";

const USERS = [
  { id: "1", name: "Amit Sharma", role: "Mentor" },
  { id: "2", name: "Riya Verma", role: "Student" },
  { id: "3", name: "Rahul Mehta", role: "Mentor" },
];

const Sidebar = ({ onSelectUser, selectedUser }) => {
  return (
    <div className="w-1/4 bg-white border-r border-gray-200 p-4">
      <h2 className="text-xl font-semibold mb-4">Chats</h2>

      <div className="space-y-2">
        {USERS.map((user) => (
          <div
            key={user.id}
            onClick={() => onSelectUser(user)}
            className={`p-3 rounded-lg cursor-pointer hover:bg-gray-100 ${
              selectedUser?.id === user.id ? "bg-gray-200" : ""
            }`}
          >
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
