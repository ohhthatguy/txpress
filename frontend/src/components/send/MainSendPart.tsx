import {  useState } from "react";
import OTP from "./OTP";
import CountDown from "./CountDown";
import useGetContextData from "../../hooks/useGetContextData";
import toast from "react-hot-toast";
import SendFiles from "./MainSend/SendFiles";

const MainSendPart = () => {
  const context = useGetContextData();
  const {otpFromServer, setOtpFromServer, socket} = context;

  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isConnected, setIsConnected] = useState<Boolean>(false); //default false


 socket?.on("generated-otp", (code)=> setOtpFromServer(code));
 socket?.on("room-joined", ()=>{
  setIsConnected(true)
 })
 

 

  return (
    <>
    { !isLoading ?
          (!isConnected ?
      <section className="shadow-2xl flex-2 gap-4 rounded flex flex-col justify-center items-center font-header font-semibold text-4xl bg-[#2E2B2C] label-sub-text-color h-96">
        <label>The Connection Code</label>
        {otpFromServer && <OTP otp={otpFromServer} />}
        <CountDown setIsLoading={setIsLoading} socket={socket!}/>
      </section>

      :
      <SendFiles />)

      :
      <section className="shadow-2xl flex-2 rounded gap-6 flex flex-col justify-center items-center font-header font-semibold text-4xl bg-[#2E2B2C] label-sub-text-color h-96">
           <label>Connecting...</label>
          <div className="h-24 w-24 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </section>
    }
    </>
  );
};

export default MainSendPart;
