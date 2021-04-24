import User from '../Models/User'

export const getUserFromLocalStorage = () => {
    const userId = localStorage.getItem("id");
    const userToken = localStorage.getItem("token");
    const userType = localStorage.getItem("isAdmin");
    let userString = localStorage.getItem("user");

    let user: User | null = null;
    if (userString)
        try {
            user = JSON.parse(userString) as User;
        } catch {
            user = null;
        }

    return { userId, userToken, userType, user };
};

export const removeUserFromLocalStorage = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
};

export const loggerRole = () => {
    const isAdmin = localStorage.getItem("isAdmin");
    const userId = localStorage.getItem("id");

    if (!userId) return null;

    return isAdmin === "true" ? "Admin" : "User";
};
