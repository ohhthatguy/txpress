import { useState } from "react";
import useGetContextData from "../../../hooks/useGetContextData";
import type { SharedFileType } from "../../../lib/types";
import toast from "react-hot-toast";

const FILES = () => {
  const { socket } = useGetContextData();
  const [isLoading, setIsLoading] = useState(false);

  const [fileData, setFileData] = useState<File | null>(null);

  const handleFileSend = async () => {
    if (!fileData) return;

    setIsLoading(true);

    console.log(fileData);

    const formData = new FormData();
    formData.append("file", fileData);

    const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:7000";

    try {
      const res = await fetch(`${url}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        toast.error("Upload Failed!")

        throw new Error(`Upload failed: ${res.statusText}`);
      }

      const result: SharedFileType = await res.json();

      socket?.emit("send:files", {
        type: "FILE",
        data: result,
        time: new Date().toLocaleTimeString(),
      });

      console.log("Uploaded file:", result);
     
    } catch (err:any) {
      console.error("Error uploading file:", err);
        toast.error(`Upload Failed! ${err?.message}`)

    }

    setFileData(null)
    setIsLoading(false);
  };

  return (
    <div className=" p-2 grid  w-full sm:w-10/12">
      <fieldset className="fieldset ">
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setFileData(e.target.files[0]); // get the first selected file
            }
          }}
          className="file-input file-input-neutral w-full"
        />
        {/* <label className="label px-1 ">Max size 2MB</label> */}
      </fieldset>

      <div className=" text-right">
        {isLoading ? (
          <div className="  flex justify-end">
            <div className=" w-7 h-7 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <button className="btn btn-active btn-sm" onClick={handleFileSend}>
            Send
          </button>
        )}
      </div>
    </div>
  );
};

export default FILES;
