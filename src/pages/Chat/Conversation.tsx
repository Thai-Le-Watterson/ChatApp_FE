import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Container, InputGroup, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useAppSelector } from "../../hook";
import { avatars } from "../../util/imageDefault";
import { conversationService } from "../../services";

import type { ConversationType } from "../../interfaces";

import "./Conversation.scss";

const Conversation: React.FC<{
  conversations: ConversationType[];
}> = ({ conversations }) => {
  // const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [avatarSelected, setAvatarSelected] = useState<string>("");
  const [groupName, setGroupName] = useState<string>("");
  const params = useParams();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    /*const conversationsData: Conversation[] = [
      {
        id: 2,
        name: "Saber",
        avatar: "https://luatdainam.vn/wp-content/uploads/2023/08/1767-4.jpg",
        lastMessaged:
          "I love you I love you I love you I love you I love you I love you I love you I love you I love you I love you I love you ",
        lastMemberSendMessaged: "Saber",
      },
      {
        id: 3,
        name: "Hik",
        avatar:
          "https://dulich3mien.vn/wp-content/uploads/2023/04/Anh-Avatar-doi-26.jpg",
        lastMessaged: "Ok bro",
        lastMemberSendMessaged: "Thai Le",
      },
      {
        id: 4,
        name: "Yuki",
        avatar:
          "https://i.pinimg.com/736x/c0/1d/d5/c01dd5cac35da8cd8a1a8fe8ef2723fd.jpg",
        lastMessaged: "",
        lastMemberSendMessaged: "",
      },
    ];*/
    window.onresize = () => {
      handleSetHeightConversations();
    };
    handleSetHeightConversations();
  }, []);

  const handleSetHeightConversations = () => {
    const listGroup = document.querySelector(
      ".list_conversation"
    ) as HTMLInputElement;
    const conversationsContainer = document.querySelector(
      ".conversations-container"
    ) as HTMLInputElement;
    const outlet = document.querySelector(".outlet") as HTMLInputElement;
    const title = document.querySelector(".title") as HTMLInputElement;
    const searchContainer = document.querySelector(
      ".search-container"
    ) as HTMLInputElement;

    if (listGroup && listGroup.style)
      listGroup!.style.height =
        (
          outlet?.offsetHeight -
          (conversationsContainer?.style.paddingTop
            ? +conversationsContainer.style.paddingTop
            : 24) *
            2 -
          title?.offsetHeight -
          searchContainer?.offsetHeight
        ).toString() + "px";
  };

  const handleCreateGroup = async () => {
    await conversationService.createGroup(
      groupName,
      avatarSelected,
      user?._id || -1
    );
    setIsShowModal(false);
  };

  return (
    <Container className="conversations-container px-0">
      <div className="title d-flex justify-content-around align-items-center">
        <span className="">Conversations ({conversations?.length || 0})</span>
        {/* <button className="btn _btn">New</button> */}
        {/* <i className="plus_icon py-2 px-3 fa-solid fa-plus"></i> */}
        <FontAwesomeIcon
          icon={faPlus}
          className="plus_icon py-2 px-3"
          onClick={() => setIsShowModal(true)}
        ></FontAwesomeIcon>
      </div>
      <div className="search-container px-3">
        <input
          className="search_input form-control w-100"
          type="text"
          placeholder="Search..."
        />
        <i className="search_icon fa-solid fa-magnifying-glass"></i>
      </div>
      <nav className="list_conversation py-4">
        {conversations?.map((conversation) => {
          return (
            <Link
              to={`/${user?._id}/${conversation._id}`}
              className={`conversation ${
                params.idRoom && conversation._id === +params.idRoom
                  ? "active"
                  : ""
              }`}
              key={conversation._id}
            >
              <div className="d-flex justity-content-left align-items-center p-2">
                <div
                  className="avatar mx-2"
                  style={{ backgroundImage: `url(${conversation.avatar})` }}
                ></div>
                <div className="message-container">
                  <p className="my-1">{conversation.name}</p>
                  <p className="my-1 message">
                    {conversation.lastMessaged
                      ? conversation.lastMessaged
                      : "Cùng nhắn tin nào bạn ơi!"}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </nav>
      <Modal
        className="modal-group"
        show={isShowModal}
        onHide={() => setIsShowModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="title" htmlFor="">
            Avatar
          </label>
          <ul className="avatars">
            {avatars &&
              avatars.map((avatar, index) => {
                return (
                  <li
                    key={`avatar-def-${index}`}
                    className={`avatar ${
                      avatar === avatarSelected && "selected"
                    }`}
                    style={{
                      backgroundImage: `url(${avatar})`,
                    }}
                    onClick={() => setAvatarSelected(avatar)}
                  ></li>
                );
              })}
          </ul>
          <label className="title" htmlFor="group-name">
            Group name
          </label>
          <input
            id="group-name"
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsShowModal(false)}>
            Close
          </Button>
          <Button variant="info" onClick={() => handleCreateGroup()}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default React.memo(Conversation);
