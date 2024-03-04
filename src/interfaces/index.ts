export type DataUserResopne = {
  data: {
    errCode: number;
    message: string | null;
  };
};

export type UserStateSlice = {
  user: User | null;
  token: string | null;
};

export type User = {
  _id: number;
  email: string;
  fullName: string;
  avatar: string;
};

export type UserContext = {
  users: User[];
  handleGetUsers: (idRoom: string) => void;
};

export type Message = {
  _id: number;
  content: string;
  conversationId: number;
  senderId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type MessageContext = {
  messages: Message[];
  handleGetMessages: (idRoom: string) => void;
  setMessages: (messages: Message[]) => void;
};

export type ConversationType = {
  _id: number;
  name: string;
  avatar: string;
  lastMessaged: string;
  lastMemberSendMessaged: number;
  membersId: number[];
  type: string;
};

export type ConversationStateSlice = {
  conversations: ConversationType[] | null;
};

export type ResponseFriendRequestType = "ALW" | "DEN";

export type FriendRequestType = {
  _id: number;
  senderId: number;
  receiverId: number;
  status: string;
  senderName: string;
  senderAvatar: string;
};
