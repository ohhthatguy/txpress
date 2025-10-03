import { useEffect } from "react";
import useGetContextData from "../../hooks/useGetContextData";
import { io, Socket } from "socket.io-client";
import toast from "react-hot-toast";

import SidePart from "../../common/sidePart/SidePart";
import MainSendPart from "./MainSendPart";

const SendCard = () => {
  const context = useGetContextData();
  const { socket, setSocket,setOtpFromServer } = context;

  useEffect(() => {
    if (!socket) {
      try {
        const newSocket: Socket = io("http://localhost:6969");
        newSocket.on("connect", () => {
          toast.success("socket send connected!");
          console.log("xonnected send socket in fronted", newSocket.id);

          newSocket.emit("generate-otp", newSocket.id);

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

      <MainSendPart />
    </div>
  );
};

export default SendCard;
