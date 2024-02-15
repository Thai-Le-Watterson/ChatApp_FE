import instanceAxios from "../axios";

const messageService = {
  getMessages: async (idRoom: string | null | undefined) => {
    try {
      const res = await instanceAxios.get(`/message/${idRoom}`);
      return res.data;
    } catch (err) {
      console.log("Error: ", err);
    }
  },
  sendMessages: async (
    senderId: number,
    conversationId: number,
    content: string
  ) => {
    try {
      const res = await instanceAxios.post(`/message`, {
        senderId,
        conversationId,
        content,
      });
      return res.data;
    } catch (err) {
      console.log("Error: ", err);
    }
  },
};

export default messageService;
