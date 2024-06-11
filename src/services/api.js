import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const createQRCode = (text) => api.post("/qrcode", { text });
export const getQRCodeData = (id) => api.get(`/qrcode/${id}`);

export default api;
