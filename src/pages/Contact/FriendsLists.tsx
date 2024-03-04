import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import { useAppSelector } from "../../hook";
import { conversationService } from "../../services";

import "./FriendsLists.scss";

function FriendLists() {
  const conversations = useAppSelector((state) => state.conversations);
  const user = useAppSelector((state) => state.user.user);

  const handleUnFriend = async (conversationId: number) => {
    await conversationService.deleteConversation(conversationId);
  };

  return (
    <Container className="list-friend_container position-absolute top-0 bottom-0 pt-3">
      <h4 className="my-3">Friends List</h4>
      {conversations &&
        conversations.map((conversation) => {
          if (conversation.type === "PV")
            return (
              <div
                key={`friend-${conversation._id}`}
                className="d-flex justify-content-between align-items-center position-relative"
              >
                <NavLink
                  to={`/${user?._id}/${conversation._id}`}
                  className="friend-infor"
                >
                  <div className="d-flex gap-2 align-items-center">
                    <div
                      className="avatar"
                      style={{ backgroundImage: `url(${conversation.avatar})` }}
                    ></div>
                    <span className="name">{conversation.name}</span>
                  </div>
                </NavLink>
                <button
                  className="btn mx-2 un"
                  onClick={() => handleUnFriend(conversation._id)}
                >
                  Unfriend
                </button>
              </div>
            );
        })}
    </Container>
  );
}

export default FriendLists;
