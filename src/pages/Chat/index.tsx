import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hook";
import conversationService from "../../services/conversationService";
import type { ConversationType } from "../../interfaces";
import { loadConversations } from "../../store/slices/conversationsSlice";

import ChatRoom from "./ChatRoom";
import Conversation from "./Conversation";
import { useEffect, useState } from "react";

function Chat() {
  // const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [conversation, setConversation] = useState<ConversationType | null>(
    null
  );
  const [windowScreen, setWindowScreen] = useState(window.innerWidth);
  const user = useAppSelector((state) => state.user.user);
  const conversations = useAppSelector((state) => state.conversations);
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    getConversations();
    getConversationSeleted();

    window.addEventListener("resize", function (e) {
      setWindowScreen((e.target as Window).innerWidth);
    });
  }, [params.idRoom, conversations?.length]);

  const getConversations = async () => {
    const data = await conversationService.getConversations(user?._id || null);
    dispatch(loadConversations(data.conversations));
    // setConversations(data.conversations);
  };

  const getConversationSeleted = () => {
    const conversationSeleted = conversations?.find((conversationItem) => {
      return conversationItem._id.toString() === params.idRoom;
    });
    setConversation(conversationSeleted || null);
  };

  const Content = () => {
    return (
      (windowScreen >= 768 && (
        <>
          <Col md={4} className="p-0">
            <Conversation conversations={conversations}></Conversation>
          </Col>
          <Col md={8} className="p-0">
            {params.idRoom && <ChatRoom conversation={conversation}></ChatRoom>}
          </Col>
        </>
      )) ||
      (!params.idRoom && (
        <Col md={4} className="p-0">
          <Conversation conversations={conversations}></Conversation>
        </Col>
      )) || (
        <Col md={8} className="p-0">
          {params.idRoom && <ChatRoom conversation={conversation}></ChatRoom>}
        </Col>
      )
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

export default Chat;
