import { useState } from "react";
import OTP from "./OTP";
import useGetContextData from "../../hooks/useGetContextData";

const MainRecievePart = () => {
  const context = useGetContextData();
  const { otpFromServer, setOtpFromServer } = context;
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isCleared, setIsCleared] = useState<Boolean>(false);

  const correctOtp = (val: string) => {
    // this function is run when the reciever enters correct code
    // from the server
    console.log("Code is corectly input by reciever.", val);
  };

  const handleOtpInput = (val: string) => {
    if (val.length == 6) {
      if (otpFromServer == Number(val)) {
        setIsLoading(true);

        correctOtp(val);
        //turn loader off when done
        setIsLoading(false);
      } else {
        setIsCleared((prev) => !prev);
      }
    }
  };

  return (
    <>
      {!isLoading ? (
        <section className="shadow-2xl flex-2 gap-9 rounded flex flex-col justify-center items-center font-header font-semibold text-4xl bg-[#2E2B2C] label-sub-text-color h-96">
          <label>Enter Connection Code</label>

          <OTP
            length={6}
            isCleared={isCleared}
            onChange={(val) => handleOtpInput(val)}
          />
        </section>
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
