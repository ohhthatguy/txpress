import { useState } from "react";
import OTP from "./OTP";
import CountDown from "./CountDown";
import useGetContextData from "../../hooks/useGetContextData";
import SendFiles from "./MainSend/SendFiles";

const MainSendPart = () => {
  const context = useGetContextData();
  const { otpFromServer, setOtpFromServer, socket } = context;

  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isConnected, setIsConnected] = useState<Boolean>(false); //default false
  const [time, setTime] = useState(0);
  

  const handleAfterOtpGeneration = (code: number) => {
    setIsLoading(false);
    setOtpFromServer(code);
    setTime(60)
  };

  socket?.on("generated-otp", handleAfterOtpGeneration);
  socket?.on("room-joined", () => {
    setIsConnected(true);
  });

  return (
    <>
      {!isLoading ? (
        !isConnected ? (
          <section className="shadow-2xl sm:flex-2 gap-4 rounded flex flex-col justify-center items-center font-header font-semibold text-4xl bg-[#2E2B2C] label-sub-text-color h-96">
            <label className="text-2xl sm:text-4xl">The Connection Code</label>
            {otpFromServer && <OTP otp={otpFromServer} />}
            <CountDown setIsLoading={setIsLoading} socket={socket!} time={time} setTime={setTime}/>
          </section>
        ) : (
          <SendFiles />
        )
      ) : (
        <section className="shadow-2xl sm:flex-2 rounded gap-6 flex flex-col justify-center items-center font-header font-semibold text-4xl bg-[#2E2B2C] label-sub-text-color h-96">
          <label className="text-2xl sm:text-4xl">Connecting...</label>
          <div className="h-24 w-24 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </section>
      )}
    </>
  );
};

export default MainSendPart;
