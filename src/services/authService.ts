import instanceAxios from "../axios";

const authService = {
  login: async (email: string, password: string) => {
    try {
      if (email && password) {
        const { data } = await instanceAxios.post("/auth/login", {
          email,
          password,
        });

        if (data.errCode === 0) {
          return { user: data.user, token: data.token };
        } else {
          return null;
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
  logout: async () => {
    try {
      await instanceAxios.post("/auth/logout", {});
    } catch (err) {
      console.log(err);
    }
  },
  signUp: async (
    email: string,
    password: string,
    fullName: string,
    avatar: string
  ) => {
    try {
      if (email && password && fullName) {
        const response = await instanceAxios.post("/auth/signUp", {
          email,
          password,
          fullName,
          avatar,
        });

        if (response.data.errCode === 0) {
          return { user: response.data.user, token: response.data.token };
        } else {
          return null;
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
};

export default authService;
