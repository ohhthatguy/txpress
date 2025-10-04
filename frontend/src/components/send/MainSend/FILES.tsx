import { useState } from "react";
import useGetContextData from "../../../hooks/useGetContextData";
import type { SharedFileType } from "../../../lib/types";

const FILES = () => {
  const { socket } = useGetContextData();
  const [isLoading, setIsLoading] = useState(false);

  const [fileData, setFileData] = useState<File | null>(null);

  const handleFileSend = async() => {

    if(!fileData) return;

    setIsLoading(true)

    console.log(fileData);

    const formData = new FormData();
    formData.append("file", fileData);

    try {
      const res = await fetch("http://localhost:7000/upload", {
        method: "POST",
        body: formData, 
      });

      if (!res.ok) {
        throw new Error(`Upload failed: ${res.statusText}`);
      }

      const result : SharedFileType = await res.json();

     socket?.emit("send:files",  {type: "FILE", data: result, time: new Date().toLocaleTimeString()})

      console.log("Uploaded file:", result);
      

    } catch (err) {
      console.error("Error uploading file:", err);
    }
    setIsLoading(false)


  };

  return (
    <div className=" p-2 grid w-10/12">
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
        <label className="label px-1 ">Max size 2MB</label>
      </fieldset>

      <div className=" text-right">
        <button className="btn btn-active" onClick={handleFileSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default FILES;
