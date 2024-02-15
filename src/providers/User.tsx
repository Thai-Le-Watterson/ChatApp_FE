import { useState, createContext, ReactNode, useEffect } from "react";
import { matchPath } from "react-router-dom";

import { User, UserContext } from "../interfaces";
import userService from "../services/userService";

export const UsersContext = createContext<UserContext>({
  users: [],
  handleGetUsers: () => {},
});

const UsersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  /*const [users, setUsers] = useState<User[]>([
    {
      _id: 1,
      email: "ThaiLe@gmail.com",
      fullName: "Thai Le",
      avatar: "https://kenh14cdn.com/thumb_w/650/2017/anh-1-1483639515932.jpg",
    },
    {
      _id: 2,
      email: "Saber@gmail.com",
      fullName: "Saber",
      avatar: "https://luatdainam.vn/wp-content/uploads/2023/08/1767-4.jpg",
    },
    {
      _id: 3,
      email: "Hik@gmail.com",
      fullName: "Hik",
      avatar:
        "https://dulich3mien.vn/wp-content/uploads/2023/04/Anh-Avatar-doi-26.jpg",
    },
    {
      _id: 4,
      email: "Yuki@gmail.com",
      fullName: "Yuki",
      avatar:
        "https://i.pinimg.com/736x/c0/1d/d5/c01dd5cac35da8cd8a1a8fe8ef2723fd.jpg",
    },
  ]);*/
  const [users, setUsers] = useState<User[]>([]);

  const handleGetUsers = async (idRoom: string) => {
    const data = await userService.getUsersInConversation(idRoom);
    setUsers(data.users);
  };

  return (
    <UsersContext.Provider value={{ users, handleGetUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
