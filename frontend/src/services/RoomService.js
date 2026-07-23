import AxiosHelper from "./AxiosHelper";

export const createRoom = (roomId) => {
  return AxiosHelper.post("/api/v1/rooms", {
    roomId,
  });
};

export const joinRoom = (roomId) => {
  return AxiosHelper.get(`/api/v1/rooms/${roomId}`);
};

export const getMessages = (roomId) => {
  return AxiosHelper.get(`/api/v1/rooms/${roomId}/messages`);
};