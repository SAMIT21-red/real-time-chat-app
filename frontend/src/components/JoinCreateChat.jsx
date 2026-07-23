import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaComments,
  FaUser,
  FaDoorOpen,
  FaBolt,
  FaLock,
} from "react-icons/fa";
import { createRoom, joinRoom } from "../services/RoomService";

const JoinCreateChat = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    roomId: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateRoom = async () => {
    if (!formData.username.trim()) {
      toast.error("Please enter your username");
      return;
    }

    if (!formData.roomId.trim()) {
      toast.error("Please enter a Room ID");
      return;
    }

    try {
      setLoading(true);

      await createRoom(formData.roomId);

      toast.success("Room Created Successfully");

      navigate(`/chat/${formData.roomId}`, {
        state: {
          username: formData.username,
        },
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to create room"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async () => {
    if (!formData.username.trim()) {
      toast.error("Please enter your username");
      return;
    }

    if (!formData.roomId.trim()) {
      toast.error("Please enter Room ID");
      return;
    }

    try {
      setLoading(true);

      await joinRoom(formData.roomId);

      toast.success("Joined Successfully");

      navigate(`/chat/${formData.roomId}`, {
        state: {
          username: formData.username,
        },
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Room not found"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-6">

      <div className="w-full max-w-lg">

        <div className="bg-slate-800/70 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl p-8">

          <div className="text-center">

            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl">
              <FaComments className="text-white text-5xl" />
            </div>

            <h1 className="text-4xl font-bold text-white mt-6">
              Real-Time Chat Platform
            </h1>

            <p className="text-gray-400 mt-3">
              Create or join a secure room and start chatting instantly.
            </p>

          </div>

          <div className="grid grid-cols-2 gap-4 my-8">

            <div className="bg-slate-900 rounded-2xl p-4 text-center border border-slate-700">
              <FaBolt className="mx-auto text-yellow-400 text-2xl mb-2" />
              <p className="text-white font-semibold">
                Real-Time
              </p>
              <p className="text-gray-400 text-sm">
                Instant Messaging
              </p>
            </div>

            <div className="bg-slate-900 rounded-2xl p-4 text-center border border-slate-700">
              <FaLock className="mx-auto text-green-400 text-2xl mb-2" />
              <p className="text-white font-semibold">
                Secure
              </p>
              <p className="text-gray-400 text-sm">
                WebSocket Chat
              </p>
            </div>

          </div>

          <div className="space-y-5">

            <div>
              <label className="text-gray-300 font-medium">
                Username
              </label>

              <div className="relative mt-2">

                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-700 border border-slate-600 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
                />

              </div>
            </div>

            <div>
              <label className="text-gray-300 font-medium">
                Room ID
              </label>

              <div className="relative mt-2">

                <FaDoorOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  name="roomId"
                  value={formData.roomId}
                  onChange={handleChange}
                  placeholder="Enter room ID"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-700 border border-slate-600 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
                />

              </div>
            </div>

            <button
              onClick={handleCreateRoom}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold hover:scale-[1.02] transition disabled:opacity-60"
            >
              {loading ? "Creating Room..." : "Create Room"}
            </button>

            <button
              onClick={handleJoinRoom}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:scale-[1.02] transition disabled:opacity-60"
            >
              {loading ? "Joining Room..." : "Join Room"}
            </button>

          </div>

          <p className="text-center text-gray-500 text-sm mt-8">
            Built with React • Spring Boot • WebSocket • MongoDB
          </p>

        </div>

      </div>

    </div>
  );
};

export default JoinCreateChat;