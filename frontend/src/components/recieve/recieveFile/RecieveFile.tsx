

const RecieveFile = () => {

    const recieveData = [{fileData: "data1"},{fileData: "data2"},{fileData: "data3"}];

    const handleRecieveClick = (e:any)=>{
            console.log(e.fileData)
    }


  return (
     <section className="shadow-2xl  flex-2 gap-9 rounded flex flex-col justify-center items-center font-header font-semibold text-4xl bg-[#2E2B2C] label-sub-text-color h-96">
            <label>Recieve Data</label>

            <div className=" w-10/12 overflow-y-auto p-2">
                {
                    recieveData.map((e,index)=>(
                        <div className="h-5/11 bg-white-color mt-2 p-2" onClick={()=>handleRecieveClick(e)} key={index}>{e.fileData}</div>
                    ))
                }

            </div>

            
          </section>
  )
}

export default RecieveFile