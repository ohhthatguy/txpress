import React,{useState} from 'react'

const FILES = () => {

    const [fileData, setFileData] = useState<File | null>(null)
     
         const handleFileSend = ()=>{
             console.log(fileData)
         }
   
  return (
    <div className=" p-2 grid w-10/12">

         <fieldset className="fieldset ">
  
  <input type="file" onChange={(e) => {
    if (e.target.files && e.target.files[0]) {
      setFileData(e.target.files[0]); // get the first selected file
    }
  }} className="file-input file-input-neutral w-full" />
  <label className="label px-1 ">Max size 2MB</label>
</fieldset>
     
      <div className=" text-right">
        <button className="btn btn-active" onClick={handleFileSend}>Send</button>
      </div>
    </div>
  );
}

export default FILES