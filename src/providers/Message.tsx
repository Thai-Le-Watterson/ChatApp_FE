import { useState, createContext, ReactNode, useEffect } from "react";

import messageService from "../services/messageService";
import type { Message, MessageContext } from "../interfaces";

export const MessagesContext = createContext<MessageContext>({
  messages: [],
  handleGetMessages: () => {},
  handlePushMessage: () => {},
});

const MessagesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  /*const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      senderId: 3,
      reciverId: 1,
      message:
        "Greetings, fellow colleagues. I would like to share my insights on this task. I reckon we should deal with at least half of the points in the plan without further delays. I suggest proceeding from one point to the next and notifying the rest of us with at least short notices. This way is best to keep track of who is doing what.",
    },
    {
      id: 2,
      senderId: 2,
      reciverId: 1,
      message:
        "One more question, guys. Did you see Webix Document Manager? I think it can help us in planning our own work. https://webix.com/assets/documentmanager/Preview@2x.png",
    },
    {
      id: 3,
      senderId: 1,
      reciverId: 2,
      message:
        "Hi, Corvo. I am sure that that's exactly what is thought best out there in Dunwall. Let's just do what we are supposed to do to get the result.",
    },
    {
      id: 4,
      senderId: 1,
      reciverId: 3,
      message:
        "Wow great, could you please share a link to this tool? Cannot wait for playing around with it.",
    },
  ]);*/
  const [messages, setMessages] = useState<Message[]>([]);

  const handleGetMessages = async (idRoom: string) => {
    const data = await messageService.getMessages(idRoom);
    setMessages(data.messages);
  };

  const handlePushMessage = async (message: Message) => {
    setMessages([...messages, message]);
  };

  return (
    <MessagesContext.Provider
      value={{ messages, handleGetMessages, handlePushMessage }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesProvider;
