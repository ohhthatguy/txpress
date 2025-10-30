import { useState } from "react";
import useGetContextData from "../../../hooks/useGetContextData";
import type { SharedDataType } from "../../../lib/types";

const TEXT = () => {

    const context = useGetContextData();
  const {socket} = context;
    const [textData, setTextData] = useState<string>('')

    const handleTextSend = ()=>{

      const data:SharedDataType = {type: "TEXT", data: textData, time: new Date().toLocaleTimeString()};
        socket?.emit("send:text", data);
        setTextData("")
    }

  return (
    <div className=" p-2 grid w-full sm:w-10/12">
      <textarea
        className="p-2 textarea textarea-lg textarea-neutral text-white w-full"
        
        name="text"
        value={textData}
        onChange={(e)=>setTextData(e.target.value)}
        placeholder="type something here..."
        
      />
      <div className=" text-right">
        <button onClick={handleTextSend} className="btn btn-active btn-sm">Send</button>
      </div>
    </div>
  );
};

export default TEXT;
