export const host="https://chat-app-server-gamma.vercel.app";

export const registerRoute=`${host}/api/auth/register`
export const loginRoute=`${host}/api/auth/login`
export const logoutRoute = `${host}/api/auth/logout`;
export const allUsersRoute = `${host}/api/auth/allusers`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const recieveMessageRoute = `${host}/api/messages/getmsg`;
export const setAvatarRoute = `${host}/api/auth/setavatar`;