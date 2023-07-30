//LOCAL STORAGE

export const setAuthUser = (data) => {
  // save object to the local storage
  // Stringify OBJECT TO TEXT
  localStorage.setItem("user", JSON.stringify(data));
};

export const getAuthUser = (data) => {
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"));
  }
};

export const removeAuthUser = () => {
  if (localStorage.getItem("user")) localStorage.removeItem("user");
};
export const isAuthenticated = () => {
  const user = localStorage.getItem("user");
  return !!user; // Check if user exists
};

export const isAdmin = () => {
  const user = getAuthUser();
  return user && user.type == "admin"; // Check if token contains admin role
};
