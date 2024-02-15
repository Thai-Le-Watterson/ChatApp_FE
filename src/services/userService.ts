import instanceAxios from "../axios";

const userService = {
  getUsersInConversation: async (conversationId: string | undefined | null) => {
    try {
      if (conversationId) {
        const res = await instanceAxios.get(
          `/user?conversationId=${conversationId}`
        );

        return res.data;
      } else {
        console.log("Data empty!");
      }
    } catch (err) {
      console.log(err);
    }
  },
};

export default userService;
