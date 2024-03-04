import instanceAxios from "../axios";
import type { ResponseFriendRequestType } from "../interfaces";

const userService = {
  getUsersInConversation: async (
    conversationId: string | undefined | null,
    isGetUserOutGr?: string | null
  ) => {
    try {
      if (conversationId) {
        const res = await instanceAxios.get(
          `/user?conversationId=${conversationId}&isGetUserOutGr=${isGetUserOutGr}`
        );

        return res.data;
      } else {
        console.log("Data empty!");
      }
    } catch (err) {
      console.log(err);
    }
  },
  getAllFriendsOfUser: async (userId: number | undefined | null) => {
    try {
      if (userId) {
        const res = await instanceAxios.get(`/user?friendOfUserId=${userId}`);

        return res.data;
      } else {
        console.log("Data empty!");
      }
    } catch (err) {
      console.log(err);
    }
  },
  getUserByEmail: async (email: string) => {
    try {
      const data = await instanceAxios.get(`user/email/${email}`);
      if (data.data.errCode === 0) return data.data.user;

      return null;
    } catch (e) {
      console.log(e);
    }
  },
  getUserById: async (userId: number | undefined | null) => {
    try {
      if (userId && userId > 0) {
        const data = await instanceAxios.get(`user/${userId}`);
        if (data.data.errCode === 0) return data.data.user;
        return null;
      }

      return null;
    } catch (e) {
      console.log(e);
    }
  },
  getFriendRequests: async (userId: number) => {
    try {
      const res = await instanceAxios.get(`/user/${userId}/friend-request`);

      if (res.data.errCode === 0) return res.data.friendRequests;

      return null;
    } catch (e) {
      console.log("userService - getAllFriendRequest: ", e);
    }
  },
  sendFriendRequests: async (senderId: number, receiverId: number) => {
    try {
      const res = await instanceAxios.post(
        `/user/friend-request?senderId=${senderId}&receiverId=${receiverId}`
      );
      return res.data;
    } catch (e) {
      console.log("userService - getAllFriendRequest: ", e);
    }
  },
  responseFriendRequests: async (
    friendRequestId: number,
    response: ResponseFriendRequestType
  ) => {
    try {
      const res = await instanceAxios.post(
        `/user/friend-response?friendRequestId=${friendRequestId}&response=${response}`
      );
      return res.data;
    } catch (e) {
      console.log("userService - getAllFriendRequest: ", e);
    }
  },
};

export default userService;
