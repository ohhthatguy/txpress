import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

interface OTPInputProps {
  length: number;
  isCleared: Boolean;
  setIsCleared: React.Dispatch<React.SetStateAction<Boolean>>;
  onChange?: (otp: string) => void;
}

const OTP = React.memo(
  ({ length, isCleared, setIsCleared, onChange }: OTPInputProps) => {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      idx: number
    ) => {
      const val = e.target.value;
      if (!/^\d*$/.test(val)) return; // allow only digits

      const newOtp = [...otp];
      newOtp[idx] = val;
      setOtp(newOtp);
      onChange?.(newOtp.join(""));

      // focus next input
      if (val && idx < length - 1) {
        inputsRef.current[idx + 1]?.focus();
      }
    };

    const handleKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
      idx: number
    ) => {
      if (e.key === "Backspace" && !otp[idx] && idx > 0) {
        inputsRef.current[idx - 1]?.focus();
      }
    };

    const clearAllInput = () => {
      inputsRef.current.forEach((e, index: number) => {
        if (e) {
          console.log(e.value);
          e.value = "";
          otp[index] = "";
        }
      });
      inputsRef.current[0]?.focus();
      toast.error("Wrong Code Entered!");
      setIsCleared(false);
    };

    useEffect(() => {
        if(isCleared){
      clearAllInput();

        }
    }, [isCleared]);

    console.log(isCleared)
  
    return (
      <div className="flex gap-2">
        {Array.from({ length }, (_, idx) => (
          <input
            key={idx}
            type="text"
            maxLength={1}
            value={otp[idx]}
            onChange={(e) => handleChange(e, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            ref={(el) => {
              if (el) inputsRef.current[idx] = el;
            }}
            className="w-12 h-12 text-center border rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
        ))}
      </div>
    );
  }
);

export default OTP;
