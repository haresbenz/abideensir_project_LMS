export const setToken = (token: string) => {
    document.cookie = `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`;
  };
  
  export const getToken = () => {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
    return tokenCookie ? tokenCookie.split("=")[1] : null;
  };
  
  export const removeToken = () => {
    document.cookie = "token=; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
  };