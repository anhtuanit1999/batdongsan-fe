const api =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:50000"
    : "https://quanlysinhvien-app.herokuapp.com";

export default api;
