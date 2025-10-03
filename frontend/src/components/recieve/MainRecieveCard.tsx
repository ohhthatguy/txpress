import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import OTP from "./OTP";
import useGetContextData from "../../hooks/useGetContextData";
import RecieveFile from "./recieveFile/RecieveFile";

const MainRecievePart = () => {
  const context = useGetContextData();
  const { socket } = context;
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isCleared, setIsCleared] = useState<Boolean>(false);
  const [isConnected, setIsConnected] = useState<Boolean>(false); //false

  const checkOtp = (val: string) => {
    // this function is run to check if the reciever enters correct code
    // from the server

    socket?.emit("checks-otp-reciever-side", Number(val), socket.id)
    // socket?.on("wrong-otp-entered", ()=>{
    //   toast.error("Wrong OTP Enteredss!")
    //   setIsCleared(true)
    // })
    
  };

  useEffect(() => {
  if (!socket) return;

  const handleWrongOtp = () => {
    toast.error("Wrong OTP Entered!");
    setIsCleared(true);
  };

  socket.on("wrong-otp-entered", handleWrongOtp);

  return () => {
    socket.off("wrong-otp-entered", handleWrongOtp);
  };
}, [socket]); 


  const handleOtpInput = (val: string) => {
    console.log("val: ", val);

    if (val.length == 6) {
    
        setIsLoading(true);

        checkOtp(val);
        //turn loader off when done
        setIsLoading(false);
      
    }
    
    // else {
    //     setIsCleared(true);
    //   }
  };



  socket?.on("room-joined", ()=>{
    setIsConnected(true);
  })

  
  
  

 
  return (
    <>
      {!isLoading ? (
        !isConnected ? (
          <section className="shadow-2xl flex-2 gap-9 rounded flex flex-col justify-center items-center font-header font-semibold text-4xl bg-[#2E2B2C] label-sub-text-color h-96">
            <label>Enter Connection Code</label>

            <OTP
              length={6}
              isCleared={isCleared}
              setIsCleared={setIsCleared}
              onChange={(val) => handleOtpInput(val)}
            />
          </section>
        ) : (
          <RecieveFile />
        )
      ) : (
        <section className="shadow-2xl flex-2 rounded gap-6 flex flex-col justify-center items-center font-header font-semibold text-4xl bg-[#2E2B2C] label-sub-text-color h-96">
          <label>Connecting...</label>
          <div className="h-24 w-24 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </section>
      )}
    </>
  );
};

export default MainRecievePart;
