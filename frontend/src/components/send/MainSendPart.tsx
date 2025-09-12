import { useEffect, useState } from "react";
import OTP from "./OTP";
import CountDown from "./CountDown";
import useGetContextData from "../../hooks/useGetContextData";

const MainSendPart = () => {
  const context = useGetContextData();
  const {otpFromServer, setOtpFromServer} = context;

  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isCallingForNewOtp, setIsCallingForNewOtp] = useState<Boolean>(false)

  const correctOtp = (val: string) => {
    // this function is run when the reciever enters correct code
    // from the server
    console.log("Code is corectly input by reciever.", val);

    //turn loader off when done
    setIsLoading(false);
  };

  const handleOtpInput = (val: string) => {
    if (val.length == 6) {
      setIsLoading(true);
      // setOtp(val);
      correctOtp(val);
    }
  };

  const callForOTPToServer = ()=>{
    
    //function to call server for the otp
    //and save that otp in state

    // setOtpFromServer(000000)
  }

  useEffect(()=>{
    setIsLoading(true);

    callForOTPToServer();
    
    setIsLoading(false);
  },[isCallingForNewOtp])

  return (
    <>
    { !isLoading ? 
      <section className="shadow-2xl flex-2 gap-4 rounded flex flex-col justify-center items-center font-header font-semibold text-4xl bg-[#2E2B2C] label-sub-text-color h-96">
        <label>The Connection Code</label>

        <OTP otp={otpFromServer} />
        <CountDown setIsCallingForNewOtp={setIsCallingForNewOtp}/>
      </section>

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
