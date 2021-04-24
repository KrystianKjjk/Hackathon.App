export const getUserFromLocalStorage = () => {
    const userId = localStorage.getItem("id");
    const userToken = localStorage.getItem("token");
    const userType = localStorage.getItem("type");
    let user = localStorage.getItem("user");
    if (user) user = JSON.parse(user);

    return { userId, userToken, userType, user };
};

export const removeUserFromLocalStorage = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    localStorage.removeItem("user");
};
