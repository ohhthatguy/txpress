import { useEffect, useState } from "react";
import useGetContextData from "../../../hooks/useGetContextData";
import type { SharedDataType } from "../../../lib/types";
import toast from "react-hot-toast";

const RecieveFile = () => {
  const context = useGetContextData();
  const { socket } = context;

  const [recievedData, setRecievedData] = useState<SharedDataType[]>([]);

  useEffect(() => {
    if (!socket) return;

    const handleRecievedData = (data: SharedDataType) => {
      toast.success("data recieved");
      setRecievedData((prev) => [...prev, data]);
    };

    socket?.on("send-data->reciever", handleRecievedData);

    return () => {
      socket.off("send-data->reciever", handleRecievedData);
    };
  }, [socket]);

  console.log(recievedData);

  // const recieveData = [{fileData: "data1"},{fileData: "data2"},{fileData: "data3"}];

  const handleRecieveClick = (e: any) => {
    // console.log(e.fileData);
  };

 const handleDownload = async (dataFile: SharedDataType) => {
  if (dataFile.type !== "FILE") return;
  if (typeof dataFile.data === "string") return;

  const file = dataFile.data;

  try {
    const res = await fetch(file.url);
    const blob = await res.blob(); // convert response to blob

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = file.name; // suggested filename
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(link.href); // clean up
  } catch (err) {
    console.error("Download failed:", err);
  }
};


  return (
    <section className="shadow-2xl  flex-2 gap-9 rounded flex flex-col justify-center items-center font-header font-semibold text-4xl bg-[#2E2B2C] label-sub-text-color h-96">
      <label>Recieve Data</label>

      <div className=" w-10/12 overflow-y-auto p-2">
        {recievedData.map((e, index) =>
         (e.type == "PASSWORD" && typeof e.data === "string") ?
           (
            <input
              type="password"
              className="h-5/11 w-full bg-white-color mt-2 p-2"
              onClick={() => handleRecieveClick(e)}
              key={index}
              value={e.data}
              disabled
            />
          ) : ((e.type == "FILE" && typeof e.data !== "string")) ? 
          (
            <div
              className="h-5/11 w-full bg-white-color mt-2 p-2 d-flex"
              key={index}
            >
                <div>{e.data.name}</div>
                <div>
                    <button onClick={()=> handleDownload(e)}>{e.data.size}byte</button>
                </div>

                
            </div>
          ) :
           (e.type == "TEXT" && typeof e.data === "string") &&
            (
              <div
                className="h-5/11 bg-white-color mt-2 p-2"
                onClick={() => handleRecieveClick(e)}
                key={index}
              >
                {e.data}
              </div>
            )
        )}
      </div>
    </section>
  );
};

export default RecieveFile;
