import { useEffect } from "react";
import useGetContextData from "../../hooks/useGetContextData";
import { io, Socket } from "socket.io-client";
import toast from "react-hot-toast";

const InitialCard = () => {
  const context = useGetContextData();
  const { cardData, setCardData, socket, setSocket } = context;

  const handleSendClick = () => {
    const CardTypeSend = {
      cardHeader: "About to Send Files ?",
      cardContent:
        "First connect to the reciever you want to share your files with",
      cardStatus: "send" as const,
    };

    setCardData(CardTypeSend);
  };

  const handleRecieveClick = () => {
    const CardTypeRecieve = {
      cardHeader: "looking for those sent files ?",
      cardContent: "First connect to the sender you want to recieve files with",
      cardStatus: "recieve" as const,
    };
    setCardData(CardTypeRecieve);
  };

  useEffect(() => {
    if (!socket) {
      try {
        const newSocket: Socket = io("https://192.168.18.76:3000");
        newSocket.on("connect", ()=>{
            toast.success("socket connected!");
        })
        setSocket(newSocket);

      } catch (e) {
        console.log("Error in connecting to socket: ", e);
      }
    }
  }, [socket]);

  return (
    <div className="rounded flex p-3 bg-white-color text-black-color">
      <section className="flex-1 ">
        <h1 className="font-header font-semibold text-4xl">
          {cardData?.cardHeader}
        </h1>
        <h4 className="font-medium label-sub-text-color leading-tight mt-3">
          {cardData?.cardContent}
        </h4>
      </section>

      <section className="gap-5  flex flex-2 h-96">
        <div
          onClick={handleSendClick}
          className=" transition-all shadow-2xl  hover:cursor-pointer hover:scale-95 scale-100 flex-1 rounded flex justify-center items-center font-header font-semibold text-4xl bg-[#2E2B2C] label-sub-text-color  "
        >
          SEND
        </div>
        <div
          onClick={handleRecieveClick}
          className="transition-all shadow-2xl  hover:cursor-pointer hover:scale-95 scale-100 flex-1 rounded flex justify-center items-center font-header font-semibold text-4xl label-sub-text-color bg-[#2E2B2C] "
        >
          RECIEVE
        </div>
      </section>
    </div>
  );
};

export default InitialCard;
