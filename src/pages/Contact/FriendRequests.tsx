import { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

import userService from "../../services/userService";
import { useAppSelector } from "../../hook";
import { FriendRequestType, ResponseFriendRequestType } from "../../interfaces";

import "./FriendRequests.scss";

function FriendRequests() {
  const [friendRequests, setFriendRequests] = useState<FriendRequestType[]>([]);
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    handleGetRequests();
  }, []);

  const handleGetRequests = async () => {
    const result = await userService.getFriendRequests(user?._id || -1);

    if (result) setFriendRequests(result);
  };

  const handleResponseRequest = async (
    friendRequestId: number,
    response: ResponseFriendRequestType
  ) => {
    await userService.responseFriendRequests(friendRequestId, response);

    setFriendRequests(
      friendRequests.filter(
        (friendRequest) => friendRequest._id !== friendRequestId
      )
    );
  };

  return (
    <Container className="friend-request_container position-absolute top-0 bottom-0">
      {friendRequests &&
        friendRequests.map((friendRequest) => {
          return (
            <div>
              <div className="user-container d-flex justify-content-between align-items-center">
                <div className="user_infor d-flex align-items-center gap-2">
                  <div
                    className="avatar"
                    style={{
                      backgroundImage: `url(${friendRequest.senderAvatar})`,
                    }}
                  ></div>
                  <span>{friendRequest.senderName}</span>
                </div>
                <div className="btn_group">
                  <Button
                    className="btn-response confirm mx-2"
                    onClick={() =>
                      handleResponseRequest(friendRequest._id, "ALW")
                    }
                  >
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="pe-2"
                    ></FontAwesomeIcon>
                    Confirm
                  </Button>
                  <Button
                    className="btn-response delete mx-2"
                    onClick={() =>
                      handleResponseRequest(friendRequest._id, "DEN")
                    }
                  >
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="pe-2"
                    ></FontAwesomeIcon>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
    </Container>
  );
}

export default FriendRequests;
