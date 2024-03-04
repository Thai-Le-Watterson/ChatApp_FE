import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { useAppSelector } from "../../hook";
import ContactBar from "./ContactBar";
import FriendLists from "./FriendsLists";
import FriendRequests from "./FriendRequests";
import AddFriend from "./AddFriend";
import JoinedGroups from "./JoinedGroups";

type ContactProps = {
  contactLocation: string;
};

function Contact(props: ContactProps) {
  const user = useAppSelector((state) => state.user.user);
  const [isShowAllContent, setIsShowAllContent] = useState<boolean>(
    window.innerWidth >= 768 ? true : false
  );

  useEffect(() => {
    window.onresize = (e) => {
      if ((e.target as Window).innerWidth >= 768 && !isShowAllContent) {
        setIsShowAllContent(true);
      } else if ((e.target as Window).innerWidth < 768 && isShowAllContent) {
        setIsShowAllContent(false);
      }
    };
  });

  const ContactContent = () => {
    switch (props.contactLocation) {
      case "friends":
        return <FriendLists></FriendLists>;
      case "groups":
        return <JoinedGroups></JoinedGroups>;
      case "add-friend":
        return <AddFriend></AddFriend>;
      case "friend-requests":
        return <FriendRequests></FriendRequests>;
      default:
        return <div></div>;
    }
  };

  const Content = () => {
    return (
      <>
        {(isShowAllContent && (
          <>
            <Col md={4} className="p-0">
              <ContactBar></ContactBar>
            </Col>
            <Col md={8} className="p-0">
              <ContactContent></ContactContent>
            </Col>
          </>
        )) ||
          (props.contactLocation === "" ? (
            <ContactBar></ContactBar>
          ) : (
            <ContactContent></ContactContent>
          ))}
      </>
    );
  };

  return (
    <Container>
      <Row>
        <Content></Content>
      </Row>
    </Container>
  );
}

export default Contact;
