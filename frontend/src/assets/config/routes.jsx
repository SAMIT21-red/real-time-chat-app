import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import ChatPage from "../../pages/ChatPage";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat/:roomId" element={<ChatPage />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};

export default AppRoute;