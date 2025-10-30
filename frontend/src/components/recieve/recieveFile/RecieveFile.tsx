import { useEffect, useState } from "react";
import useGetContextData from "../../../hooks/useGetContextData";
import type { SharedDataType } from "../../../lib/types";
import toast from "react-hot-toast";
import { GoDownload } from "react-icons/go";
import { TiClipboard } from "react-icons/ti";
import Modal from "../../../common/modal/Modal";

const RecieveFile = () => {
  const context = useGetContextData();
  const { socket } = context;

  const [recievedData, setRecievedData] = useState<SharedDataType[]>([]);
  const [isDownloading, setIsDownloading] = useState<Boolean>(false);
  const [isConnectionLost, setIsConnectionLost] = useState<Boolean>(false);

  useEffect(() => {
    if (!socket) return;

    const handleRecievedData = (data: SharedDataType) => {
      toast.success("data recieved");
      setRecievedData((prev) => [...prev, data]);
    };

    socket?.on("send-data->reciever", handleRecievedData);
    socket?.on("communication-lost", () => setIsConnectionLost(true));

   


    return () => {
      socket.off("send-data->reciever", handleRecievedData);
    };
  }, [socket]);

  const handleDownload = async (dataFile: SharedDataType) => {
    if (dataFile.type !== "FILE") return;
    if (typeof dataFile.data === "string") return;

    setIsDownloading(true);

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
      toast.error("Download Failed");
    }

    setIsDownloading(false);
  };

  const handleCopyText = (textFile: SharedDataType) => {
    if (typeof textFile.data !== "string") return;

    navigator.clipboard
      .writeText(textFile.data)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast.error("failed to copy");
      });
  };

  return (
    <section className="shadow-2xl  sm:flex-2 gap-9 rounded flex flex-col justify-center items-center font-header font-semibold text-4xl bg-[#2E2B2C] label-sub-text-color h-96">
      <label className="text-2xl sm:text-4xl">Recieved Data</label>

      <div className=" sm:w-10/12 overflow-y-auto p-2">
        {recievedData.map((e, index) =>
          e.type == "PASSWORD" && typeof e.data === "string" ? (
            <div className="relative ">
              <input
                type="password"
                className="h-5/11 w-full bg-white-color mt-2 p-2 pr-4"
                key={index}
                value={e.data}
                readOnly
              />
              <div
                className="hover:cursor-pointer text-md  text-black absolute bottom-4 right-0"
                onClick={() => handleCopyText(e)}
              >
                <TiClipboard />
              </div>
            </div>
          ) : e.type == "FILE" && typeof e.data !== "string" ? (
            <div
              className="h-full overflow-hidden bg-white-color mt-2 p-2 flex gap-2 "
              key={index}
            >
              <div className="w-12/12 overflow-ellipsis break-words  ">{e.data.name} <h3>({(e.data.size / 1024 / 1024).toPrecision(2)}MB)</h3></div>

              <div className="w-4/12 text-right">
                {/* <h3>{(e.data.size / 1024 / 1024).toPrecision(2)}MB</h3> */}
                {isDownloading ? (
                  <div className="  flex justify-end">
                    <div className="w-7 h-7 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <button
                    className="hover:cursor-pointer text-md  text-black"
                    onClick={() => handleDownload(e)}
                  >
                    <GoDownload />
                  </button>
                )}
              </div>
            </div>
          ) : (
            e.type == "TEXT" &&
            typeof e.data === "string" && (
              <div className="relative ">
                <div
                  className="h-5/11 bg-white-color mt-2 p-2 pr-4 "
                  
                  key={index}
                >
                  {e.data}
                </div>

                <div
                  className="hover:cursor-pointer text-md  text-black absolute bottom-2 right-0"
                  onClick={() => handleCopyText(e)}
                >
                  <TiClipboard />
                </div>
              </div>
            )
          )
        )}
      </div>

      {isConnectionLost && (
        <Modal
          text="Sender Is Disconnected. Please Download the contents and return to homepage!"
          setIsConnectionLost={setIsConnectionLost}
        />
      )}
    </section>
  );
};

export default RecieveFile;
