import { useEffect,useState } from "react";
import useGetContextData from "../../hooks/useGetContextData";
import { io, Socket } from "socket.io-client";
import toast from "react-hot-toast";

import SidePart from "../../common/sidePart/SidePart";
import MainSendPart from "./MainSendPart";
import Modal from "../../common/modal/Modal";

const SendCard = () => {
  const context = useGetContextData();
  const { socket, setSocket } = context;
    const [isConnectionLost, setIsConnectionLost] = useState<Boolean>(false);
  

  useEffect(() => {
    if (!socket) {
      try {
        const newSocket: Socket = io(import.meta.env.VITE_BACKEND_URL || "http://localhost:6969");
        newSocket.on("connect", () => {
          toast.success("socket send connected!");
          console.log("xonnected send socket in fronted", newSocket.id);

          newSocket.emit("generate-otp", newSocket.id);

          setSocket(newSocket);
        });

        newSocket?.on("communication-lost", () => setIsConnectionLost(true));


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
    <div className="rounded flex flex-col sm:flex-row p-3 bg-white-color text-black-color">
      <SidePart />

      <MainSendPart />

       {isConnectionLost && (
        <Modal
          text="Reciever Is Disconnected. Please return to homepage!"
          setIsConnectionLost={setIsConnectionLost}
        />
      )}
    </div>
  );
};

export default SendCard;
