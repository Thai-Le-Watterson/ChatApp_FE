import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Button, FormCheck, ListGroup, Modal } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import {
  conversationService,
  messageService,
  userService,
} from "../../services";
import { useAppDispatch, useAppSelector } from "../../hook";
import { UsersContext } from "../../providers";
import socket from "../../socket";
import { loadMessages, addMessage } from "../../store/slices/messagesSlice";

import type { ConversationType, Message, User } from "../../interfaces";

import "./ChatRoom.scss";

const $: JQueryStatic = require("jquery");
const _ = require("lodash");
type MembersIdSeletedType = {
  memberId: number;
  avatar: string;
  name: string;
  selected: boolean;
};

const ChatRoom: React.FC<{ conversation: ConversationType | null }> = ({
  conversation,
}) => {
  const [message, setMessage] = useState<string>("");
  const [isOpenRoomInfor, setIsOpenRoomInfor] = useState<boolean>(false);
  const [isOpenMemberList, setIsOpenMemberList] = useState<boolean>(true);
  const [isShowFriendModel, setIsShowFriendModel] = useState<boolean>(false);
  const [allUsersSendMessInGR, setAllUsersSendMessInGR] = useState<User[]>([]);
  const [membersIdSelected, setMembersIdSelected] = useState<
    MembersIdSeletedType[]
  >([]);
  const { users, handleGetUsers } = useContext(UsersContext);
  const messages = useAppSelector((state) => state.messages);
  const conversations = useAppSelector((state) => state.conversations);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetMessages();
    handleGetUsers(params.idRoom || "");
    handleGetAllUserSendMess();
    loadMembersIdSelected();

    socket.on("send-message", (message: Message) => {
      if (params?.idRoom == message.conversationId.toString()) {
        dispatch(addMessage(message));
      }
      setMessage("");
    });

    handleSetHeightChatroom();
  }, [params.idRoom]);

  const loadMembersIdSelected = () => {
    const arrMembersId: MembersIdSeletedType[] = [];

    conversations.forEach((conversationItem) => {
      if (conversationItem?.type === "PV") {
        const objMember = {
          memberId:
            conversationItem.membersId.find((id) => id !== user?._id) || -1,
          avatar: conversationItem.avatar,
          name: conversationItem.name,
          selected: false,
        };
        objMember.memberId > 0 && arrMembersId.push(objMember);
      }
    });
    setMembersIdSelected(arrMembersId);
  };

  const handleSetHeightChatroom = () => {
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

  const handleGetAllUserSendMess = async () => {
    const data = await userService.getUsersInConversation(
      conversation?._id.toString() || "",
      "true"
    );

    setAllUsersSendMessInGR(data?.users || []);
  };

  const handleGetMessages = useCallback(async () => {
    const idRoom = params.idRoom || "";
    const data = await messageService.getMessages(idRoom);
    // data?.messages && setMessages(data.messages));
    data?.messages && dispatch(loadMessages(data.messages));
  }, [params.idRoom]);

  const handleSendMessage = async (content: string) => {
    socket.emit("send-message", {
      senderId: user?._id,
      conversationId: conversation?._id,
      content,
    });
  };

  const handleDeleteMessage = async (messageId: number) => {
    await messageService.deleteMessage(messageId);
    handleGetMessages();
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

  const checkPointShowDate = (date: Date, index: number) => {
    const nextDate = new Date(messages[index + 1]?.createdAt);

    if (index === messages.length - 1) {
      return true;
    } else if (nextDate?.toDateString() !== date.toDateString()) {
      return true;
    }

    return false;
  };

  const handleOutGroup = async () => {
    await conversationService.outGroup(user?._id, conversation?._id);
    navigate(`/${user?._id}`);
  };

  const handleDeleteGroup = async () => {
    await conversationService.deleteGroup(conversation?._id);
    navigate(`/${user?._id}`);
  };

  const handleAddMember = async () => {
    const dataReq: number[] = [];
    membersIdSelected.forEach((value) => {
      if (value.selected) dataReq.push(value.memberId);
    });

    await conversationService.addUsersToGroup(dataReq, conversation?._id);
    setIsShowFriendModel(false);
    setIsOpenRoomInfor(false);
    setMembersIdSelected(
      membersIdSelected.map((mem) => {
        return { ...mem, selected: false };
      })
    );
    handleGetUsers(params.idRoom || "");
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
            {conversation?.type === "GR" && (
              <p className="members_count">{users?.length || 0} members</p>
            )}
          </div>
        </div>
        {conversation?.type === "GR" && (
          <>
            <Modal
              show={isShowFriendModel}
              onHide={() => setIsShowFriendModel(false)}
              className="modal-friends-list"
            >
              <Modal.Header>
                <Modal.Title>Friends List</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ul className="friends-list">
                  {membersIdSelected.map((item, index) => {
                    return (
                      <li
                        key={`choose-friend${item.memberId}`}
                        className="friend"
                      >
                        <div className="d-flex align-items-center gap-2">
                          <div
                            className="avatar"
                            style={{ backgroundImage: `url(${item.avatar})` }}
                          ></div>
                          <span className="name">{item.name}</span>
                        </div>
                        <FormCheck
                          value={item.memberId}
                          checked={item.selected}
                          onChange={(e) =>
                            setMembersIdSelected(
                              membersIdSelected.map((mem) => {
                                if (mem.memberId === item.memberId)
                                  return { ...mem, selected: e.target.checked };
                                return mem;
                              })
                            )
                          }
                        ></FormCheck>
                      </li>
                    );
                  })}
                </ul>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setIsShowFriendModel(false)}
                >
                  Cancel
                </Button>
                <Button variant="info" onClick={() => handleAddMember()}>
                  Add
                </Button>
              </Modal.Footer>
            </Modal>
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
                        style={{
                          backgroundImage: `url(${conversation?.avatar})`,
                        }}
                      ></div>
                      <p>{conversation?.name}</p>
                    </div>
                    <h6
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handleShowHideMemberList(!isOpenMemberList)
                      }
                    >
                      Members list
                      {/* <i className="fa-solid fa-caret-down px-2"></i> */}
                      <FontAwesomeIcon
                        icon="caret-down"
                        className="px-2"
                      ></FontAwesomeIcon>
                    </h6>
                    <ul className="members_list">
                      <button
                        className="button"
                        onClick={() => setIsShowFriendModel(true)}
                      >
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
                              style={{
                                backgroundImage: `url(${user?.avatar})`,
                              }}
                            ></div>
                            {user.fullName}
                          </li>
                        );
                      })}
                    </ul>
                    <div className="foot_room-infor">
                      {conversation.membersId[0] === user?._id && (
                        <button
                          className="btn_out mb-2"
                          onClick={() => handleDeleteGroup()}
                        >
                          Delete Group <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      )}
                      <button
                        className="btn_out"
                        onClick={() => handleOutGroup()}
                      >
                        Out Group{" "}
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <ListGroup className="list_message px-4 d-flex flex-column-reverse">
        {messages?.map((message, index) => {
          const isMyMessage: boolean = message.senderId === user?._id;
          const date = new Date(message.createdAt);
          // const dateOfMessage = handleGetDateOfMessage(date.toDateString());
          const isPointShowDate = checkPointShowDate(date, index);
          let fullName = allUsersSendMessInGR.find(
            (userItem) => message.senderId === userItem._id
          )?.fullName;
          let avatar = allUsersSendMessInGR.find(
            (userItem) => message.senderId === userItem._id
          )?.avatar;

          return (
            <>
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
                      backgroundImage: `url(${avatar})`,
                    }}
                  ></div>
                )}
                <div
                  className={`message_infor rounded p-2 align-items-${
                    isMyMessage ? "end" : "start"
                  }`}
                >
                  {isMyMessage && (
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="btn-delete"
                      onClick={() => handleDeleteMessage(message._id)}
                    />
                  )}
                  {!isMyMessage && (
                    <span className="user_name">{fullName}</span>
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

export default React.memo(ChatRoom);
