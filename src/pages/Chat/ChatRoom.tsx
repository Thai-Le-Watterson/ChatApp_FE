import React, { useState, useContext, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { useAppSelector } from "../../hook";
import { UsersContext, MessagesContext } from "../../providers";
import messageService from "../../services/messageService";
import socket from "../../socket";

import type { ConversationType, Message } from "../../interfaces";

import "./ChatRoom.scss";

const _ = require("lodash");

const ChatRoom: React.FC<{ conversation: ConversationType | null }> = ({
  conversation,
}) => {
  const [message, setMessage] = useState<string>("");
  const { users, handleGetUsers } = useContext(UsersContext);
  const { messages, handleGetMessages, setMessages } =
    useContext(MessagesContext);
  const user = useAppSelector((state) => state.user.user);
  const params = useParams();

  useEffect(() => {
    handleGetMessages(params.idRoom || "");
    handleGetUsers(params.idRoom || "");

    socket.on("send-message", (message: Message) => {
      // handleGetMessages(params.idRoom || "");
      setMessages([message, ...messages]);
      setMessage("");
    });

    handleSetHeightChatroom();
  }, [params.idRoom]);

  const handleSetHeightChatroom = () => {
    const chatRoomContainer = document.querySelector(
      ".chat_room-container"
    ) as HTMLInputElement;
    const listMessage = document.querySelector(
      ".list_message"
    ) as HTMLInputElement;
    const outlet = document.querySelector(".outlet") as HTMLInputElement;
    const roomHeader = document.querySelector(
      ".room_header"
    ) as HTMLInputElement;
    const roomInput = document.querySelector(".room_input") as HTMLInputElement;

    listMessage!.style.height =
      (
        outlet?.offsetHeight -
        roomHeader?.offsetHeight -
        roomInput?.offsetHeight
      ).toString() + "px";
  };

  /*const handleSendMessage = async (content: string) => {
    console.log({
      user: user?._id,
      conversation: conversation?._id,
      message,
    });

    if (
      user?._id !== undefined &&
      conversation?._id !== undefined &&
      message !== ""
    ) {
      const data = await messageService.sendMessages(
        user?._id,
        conversation?._id,
        content
      );
      console.log("data: ", data);
    }
  };*/

  const handleSendMessage = async (content: string) => {
    socket.emit("send-message", {
      senderId: user?._id,
      conversationId: conversation?._id,
      content,
    });
  };

  return (
    <div className="chat_room-container d-flex flex-column justify-content-beetween">
      <div className="room_header d-flex justity-content-beetween align-items-center px-4 py-3">
        <div className="d-flex w-100 gap-2 align-items-center">
          <div
            className="avatar"
            style={{
              backgroundImage: `url(${conversation?.avatar})`,
            }}
          ></div>
          <span className="room_name">{conversation?.name}</span>
        </div>
        <div className="room_infor">
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </div>
      </div>
      <ListGroup className="list_message px-4 d-flex flex-column-reverse">
        {messages?.map((message) => {
          const isMyMessage: boolean = message.senderId === user?._id;

          return (
            <ListGroup.Item
              key={message?._id}
              className="message w-75 my-2 d-flex gap-2"
              style={{
                alignSelf: `${isMyMessage ? "end" : "normal"}`,
                flexFlow: `${isMyMessage ? "row-reverse" : "row"}`,
              }}
            >
              <div
                className="message_avatar"
                style={{
                  backgroundImage: `url(${
                    users.find((userItem) => message.senderId === userItem._id)
                      ?.avatar
                  })`,
                }}
              ></div>
              <div
                className={`message_infor rounded p-2 align-items-${
                  isMyMessage ? "end" : "start"
                }`}
              >
                <span className="user_name">
                  {
                    users.find((userItem) => message.senderId === userItem._id)
                      ?.fullName
                  }
                </span>
                <p className={`content text-${isMyMessage ? "right" : "left"}`}>
                  {message?.content}
                </p>
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      <div className="room_input px-4 py-4 d-flex justify-content-between gap-2 align-items-center">
        <input
          type="text"
          className="input_message form-control w-70"
          placeholder="Type here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.code === "Enter" && handleSendMessage(message)}
        />
        <button
          className="btn btn_send w-20"
          onClick={() => handleSendMessage(message)}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
