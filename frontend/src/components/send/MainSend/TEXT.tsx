import { useState } from "react";

const TEXT = () => {

    const [textData, setTextData] = useState<string>('')

    const handleTextSend = ()=>{
        console.log(textData)
    }

  return (
    <div className=" p-2 grid w-10/12">
      <textarea
        className="p-2 textarea textarea-lg textarea-neutral text-white w-full"
        
        name="text"
        value={textData}
        onChange={(e)=>setTextData(e.target.value)}
        placeholder="type something here..."
        
      />
      <div className=" text-right">
        <button onClick={handleTextSend} className="btn btn-active">Send</button>
      </div>
    </div>
  );
};

export default TEXT;
