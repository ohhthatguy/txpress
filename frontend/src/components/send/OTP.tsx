const OTP = ({ otp }: { otp: number }) => {
  return (
    <div className="flex gap-2">
      {otp
        .toString()
        .split("")
        .map((e: string, idx: number) => (
          <div
            key={idx}
            className="w-12 h-12 text-center border rounded focus:outline-none focus:ring focus:ring-blue-400"
          >
            {e}{" "}
          </div>
          
        )) 
      
      }
    </div>
  );
};

export default OTP;
