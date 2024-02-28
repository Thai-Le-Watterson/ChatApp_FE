import React, { useState, useContext, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAppSelector } from "../../hook";
import { UsersContext, MessagesContext } from "../../providers";
import socket from "../../socket";

import type { ConversationType, Message } from "../../interfaces";

import "./ChatRoom.scss";

const $: JQueryStatic = require("jquery");
const _ = require("lodash");

const ChatRoom: React.FC<{ conversation: ConversationType | null }> = ({
  conversation,
}) => {
  const [message, setMessage] = useState<string>("");
  const [isOpenRoomInfor, setIsOpenRoomInfor] = useState<boolean>(false);
  const [isOpenMemberList, setIsOpenMemberList] = useState<boolean>(true);
  const { users, handleGetUsers } = useContext(UsersContext);
  const { messages, handleGetMessages, setMessages } =
    useContext(MessagesContext);
  const user = useAppSelector((state) => state.user.user);
  const params = useParams();

  useEffect(() => {
    handleGetMessages(params.idRoom || "");
    handleGetUsers(params.idRoom || "");
    localStorage.setItem("dateMessage", "");

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

  const handleShowHideRoomInfor = (state: boolean) => {
    const duration = 200;

    if (state) {
      setIsOpenRoomInfor(state);
    } else {
      animationHideRoomInfor(duration);
      setTimeout(() => {
        setIsOpenRoomInfor(state);
      }, duration - 50);
    }
  };

  const animationHideRoomInfor = (duration: number) => {
    const roomInfor = document.querySelector(".room_infor") as HTMLElement;
    roomInfor!.style.animationName = "goToLeft";
    roomInfor!.style.animationDuration = duration + "";
  };

  const handleShowHideMemberList = (state: boolean) => {
    const duration = 200;

    setIsOpenMemberList(state);
    animationHideMemberList(duration, state);
  };

  const animationHideMemberList = (duration: number, isOpen: boolean) => {
    const memberList = $(".members_list");
    isOpen ? memberList.slideDown(duration) : memberList.slideUp(duration);
  };

  const handleGetDateOfMessage = (date: string) => {
    if (!localStorage.getItem("dateMessage")) {
      localStorage.setItem("dateMessage", date);
      return "";
    } else if (localStorage.getItem("dateMessage") !== date) {
      const datePrevious = localStorage.getItem("dateMessage");
      localStorage.setItem("dateMessage", date);

      return datePrevious;
    }

    return "";
  };

  const checkPointShowDate = (date: Date, index: number) => {
    const nextDate = new Date(messages[index + 1]?.createdAt);

    if (index === messages.length - 1) {
      return true;
    } else if (nextDate?.toDateString() !== date.toDateString()) {
      return true;
    }

    return false;
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
          <div>
            <span className="room_name">{conversation?.name}</span>
            <p className="members_count">{users?.length || 0} members</p>
          </div>
        </div>
        <div className="room_infor-container">
          <FontAwesomeIcon
            icon="bars"
            className="bars_icon"
            onClick={() => handleShowHideRoomInfor(true)}
          ></FontAwesomeIcon>
          {isOpenRoomInfor && (
            <div className="overlay">
              <div className="room_infor">
                <FontAwesomeIcon
                  icon="bars"
                  className="bars_icon"
                  onClick={() => handleShowHideRoomInfor(false)}
                ></FontAwesomeIcon>
                <div className="text-center">
                  <div
                    className="group_avatar"
                    style={{ backgroundImage: `url(${conversation?.avatar})` }}
                  ></div>
                  <p>{conversation?.name}</p>
                </div>
                <h6
                  style={{ cursor: "pointer" }}
                  onClick={() => handleShowHideMemberList(!isOpenMemberList)}
                >
                  Members list
                  {/* <i className="fa-solid fa-caret-down px-2"></i> */}
                  <FontAwesomeIcon
                    icon="caret-down"
                    className="px-2"
                  ></FontAwesomeIcon>
                </h6>
                <ul className="members_list">
                  <button className="button">
                    <FontAwesomeIcon
                      icon="plus"
                      className="px-2"
                    ></FontAwesomeIcon>
                    Add member
                  </button>
                  {users?.map((user) => {
                    return (
                      <li
                        key={"member-" + user._id}
                        className="d-flex gap-2 my-3 align-items-center"
                      >
                        <div
                          className="avatar"
                          style={{ backgroundImage: `url(${user?.avatar})` }}
                        ></div>
                        {user.fullName}
                      </li>
                    );
                  })}
                </ul>
                <div className="foot_room-infor">
                  <button className="btn_out">
                    Out Group{" "}
                    <FontAwesomeIcon icon="arrow-right-from-bracket" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ListGroup className="list_message px-4 d-flex flex-column-reverse">
        {messages?.map((message, index) => {
          const isMyMessage: boolean = message.senderId === user?._id;
          const date = new Date(message.createdAt);
          // const dateOfMessage = handleGetDateOfMessage(date.toDateString());
          const isPointShowDate = checkPointShowDate(date, index);

          return (
            <>
              {/* {dateOfMessage && (
                <div className="date_message" key={`date-${message._id}`}>
                  {dateOfMessage}
                </div>
              )} */}
              <ListGroup.Item
                key={message?._id}
                className="message w-75 my-2 d-flex gap-2"
                style={{
                  alignSelf: `${isMyMessage ? "end" : "normal"}`,
                  flexFlow: `${isMyMessage ? "row-reverse" : "row"}`,
                }}
              >
                {!isMyMessage && (
                  <div
                    className="message_avatar"
                    style={{
                      backgroundImage: `url(${
                        users.find(
                          (userItem) => message.senderId === userItem._id
                        )?.avatar
                      })`,
                    }}
                  ></div>
                )}
                <div
                  className={`message_infor rounded p-2 align-items-${
                    isMyMessage ? "end" : "start"
                  }`}
                >
                  {!isMyMessage && (
                    <span className="user_name">
                      {
                        users.find(
                          (userItem) => message.senderId === userItem._id
                        )?.fullName
                      }
                    </span>
                  )}
                  <p className="content m-0">{message?.content}</p>
                  <span className="time_mess">
                    {date?.getHours() + ":" + date?.getMinutes()}
                  </span>
                </div>
              </ListGroup.Item>
              {isPointShowDate && (
                <div className="date_message" key={`date-${message._id}`}>
                  {date.toDateString() === new Date().toDateString()
                    ? "Today"
                    : date.toDateString()}
                </div>
              )}
              {/* {message.createdAt ===
                messages[messages.length - 1].createdAt && (
                <div className="date_message" key={`date-${message._id}`}>
                  {date.toDateString()}
                </div>
              )} */}
            </>
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
