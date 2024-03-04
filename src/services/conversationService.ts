import instanceAxios from "../axios";

const conversationService = {
  getConversations: async (userId: number | null) => {
    try {
      if (userId || userId === 0) {
        const res = await instanceAxios.get(`/conversation?userId=${userId}`);

        return res.data;
      } else {
        console.log("Data empty!");
      }
    } catch (err) {
      console.log(err);
    }
  },
  createGroup: async (name: string, avatar: string, memberId: number) => {
    try {
      if (name && avatar && memberId && memberId > 0) {
        const res = await instanceAxios.post(`/conversation`, {
          name,
          avatar,
          memberId,
          type: "GR",
        });
        return res.data;
      }

      return null;
    } catch (err) {
      console.log(err);
    }
  },
  deleteGroup: async (conversationId: number | undefined | null) => {
    try {
      if (conversationId) {
        const res = await instanceAxios.delete(
          `/conversation/${conversationId}`
        );
        return res.data;
      }

      return null;
    } catch (err) {
      console.log(err);
    }
  },
  outGroup: async (
    userId: number | undefined | null,
    conversationId: number | undefined | null
  ) => {
    try {
      if (conversationId && userId && userId > 0) {
        const res = await instanceAxios.delete(
          `/conversation/${conversationId}/${userId}`
        );
        return res.data;
      }
      return null;
    } catch (err) {
      console.log(err);
    }
  },
  addUsersToGroup: async (
    usersId: number[] | undefined | null,
    conversationId: number | undefined | null
  ) => {
    try {
      if (conversationId && usersId) {
        const res = await instanceAxios.post(
          `/conversation/${conversationId}`,
          { usersId }
        );
        return res.data;
      }
      return null;
    } catch (err) {
      console.log(err);
    }
  },
  deleteConversation: async (conversationId: number | undefined | null) => {
    try {
      if (conversationId) {
        const res = await instanceAxios.delete(
          `/conversation/${conversationId}`
        );
        return res.data;
      }

      return null;
    } catch (err) {
      console.log(err);
    }
  },
};

export default conversationService;
