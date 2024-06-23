export const setToken = (token, user) => {
  return {
    type: "SET_TOKEN",
    token: token,
    user: user,
  };
};

export const clearToken = () => {
  return {
    type: "CLEAR_TOKEN",
  };
};
