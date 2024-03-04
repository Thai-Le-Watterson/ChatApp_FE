import { useCallback, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faMessage,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { useAppSelector } from "../../hook";
import userService from "../../services/userService";

import { ConversationType, type User } from "../../interfaces";

import "./AddFriend.scss";
import { NavLink } from "react-router-dom";

function AddFriend() {
  const [userSearching, setUserSearching] = useState<User | null>(null);
  const [email, setEmail] = useState<string>("");
  const [friend, setFriend] = useState<ConversationType | null>(null);
  const user = useAppSelector((state) => state.user.user);
  const conversations = useAppSelector((state) => state.conversations);

  useEffect(() => {
    handleGetFriend();
  }, []);

  const handleGetFriend = useCallback(() => {
    setFriend(
      conversations.find((conversation) => {
        return (
          conversation.type === "PV" &&
          conversation.membersId.every((memberId) => {
            return memberId === user?._id || memberId === userSearching?._id;
          })
        );
      }) || null
    );
  }, [conversations]);

  const handleSearching = async (email: string) => {
    const userResponse = await userService.getUserByEmail(email);
    setUserSearching(userResponse);
  };

  const handleSendFriendRequest = async () => {
    await userService.sendFriendRequests(
      user?._id || -1,
      userSearching?._id || -1
    );
  };

  const goToConversation = (conversationId: number) => {
    return <NavLink to={`/${user?._id}/${conversationId}`}></NavLink>;
  };

  return (
    <Container className="add-friend_container">
      <div className="position-relative my-5">
        <input
          type="email"
          placeholder=" Email address..."
          className="inp_search"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            e.code === "Enter" && handleSearching(email);
          }}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="icon-search position-absolute px-3 py-2"
          onClick={() => handleSearching(email)}
        />
      </div>
      {userSearching &&
        (userSearching._id === user?._id ? (
          <h5>Why are you searching yourseft?</h5>
        ) : (
          <>
            <h5 className="title">Search Result</h5>
            <div className="user-container d-flex justify-content-between align-items-center">
              <div className="user_infor d-flex align-items-center gap-2">
                <div
                  className="avatar"
                  style={{ backgroundImage: `url(${userSearching.avatar})` }}
                ></div>
                <span>{userSearching.fullName}</span>
              </div>
              {friend?._id === userSearching._id ? (
                <Button className="btn-add">
                  <FontAwesomeIcon
                    icon={faMessage}
                    className="pe-2"
                    onClick={() => goToConversation(friend._id)}
                  ></FontAwesomeIcon>
                  Message
                </Button>
              ) : (
                <Button
                  className="btn-add"
                  onClick={() => handleSendFriendRequest()}
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="pe-2"
                  ></FontAwesomeIcon>
                  Add friend
                </Button>
              )}
            </div>
          </>
        ))}
    </Container>
  );
}

export default AddFriend;
