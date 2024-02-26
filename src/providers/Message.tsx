import { useState, createContext, ReactNode, useEffect } from "react";

import messageService from "../services/messageService";
import type { Message, MessageContext } from "../interfaces";

export const MessagesContext = createContext<MessageContext>({
  messages: [],
  handleGetMessages: () => {},
  setMessages: () => {},
});

const MessagesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleGetMessages = async (idRoom: string) => {
    const data = await messageService.getMessages(idRoom);
    data?.messages && setMessages(data.messages);
  };

  // const handlePushMessage = async (message: Message) => {
  //   setMessages([...messages, message]);
  // };

  return (
    <MessagesContext.Provider
      value={{ messages, handleGetMessages, setMessages }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesProvider;
