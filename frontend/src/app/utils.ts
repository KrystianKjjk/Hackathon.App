export const getUserFromLocalStorage = () => {
  const userId = localStorage.getItem("id");
  const userToken = localStorage.getItem("token");
  const userType = localStorage.getItem("type");
  const user = localStorage.getItem("user");

  return { userId, userToken, userType, user };
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("id");
  localStorage.removeItem("token");
  localStorage.removeItem("type");
  localStorage.removeItem("user");
};
