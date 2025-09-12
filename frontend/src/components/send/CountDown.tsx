import { useEffect, useState } from "react";

const CountDown = ({
  setIsCallingForNewOtp,
}: {
  setIsCallingForNewOtp: React.Dispatch<React.SetStateAction<Boolean>>;
}) => {
  const [time, setTime] = useState(60);

  useEffect(() => {
    if (time <= 0) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        } else {
          return prev - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const handleRegenerate = () => {
    //code to server to start the regenration

    //after this start the timer again
    setTime(60);
    setIsCallingForNewOtp((prev) => !prev);
  };

  return (
    <>
      {time <= 0 ? (
        <button className="btn btn-primary" onClick={handleRegenerate}>
          REGENERATE
        </button>
      ) : (
        <div className="flex gap-2">
          <label>Expires in: </label>

          {time
            .toString()
            .split("")
            .map((e, index) => (
              <div
                key={index}
                className="w-12 h-12 text-center border rounded focus:outline-none focus:ring focus:ring-blue-400 "
              >
                {e}
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default CountDown;
