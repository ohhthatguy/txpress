import { useEffect } from "react";
import useGetContextData from "../../hooks/useGetContextData";
import { io, Socket } from "socket.io-client";
import toast from "react-hot-toast";

import MainRecievePart from "./MainRecieveCard";
import SidePart from "../../common/sidePart/SidePart";

const RecieveCard = () => {
  const context = useGetContextData();
  const { socket, setSocket } = context;

  useEffect(() => {
    if (!socket) {
      try {
        const newSocket: Socket = io(import.meta.env.VITE_BACKEND_URL || "http://localhost:6969");
        newSocket.on("connect", () => {
          toast.success("socket receieve connected!");
          console.log("xonnected receieve socket in fronted", newSocket.id);
          setSocket(newSocket);
        });

        return () => {
          newSocket.disconnect(); // disconnect socket
          newSocket.off(); // remove all listeners
        };
      } catch (e) {
        console.log("Error in connecting to socket: ", e);
      }
    }
  }, []);

  return (
    <div className="rounded flex p-3 bg-white-color text-black-color">
      <SidePart />

      <MainRecievePart />

      
    </div>
  );
};

export default RecieveCard;
