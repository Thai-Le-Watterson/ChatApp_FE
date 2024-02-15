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
};

export default conversationService;
