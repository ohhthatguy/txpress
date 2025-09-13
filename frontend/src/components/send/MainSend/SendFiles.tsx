import { useState } from "react";
import TEXT from "./TEXT";
import PASSWORD from "./PASSWORD";
import FILES from "./FILES";

const SendFiles = () => {

    type selectOptionType = "TEXT" | "PASSWORD" | "FILES";
    const [selectedOption, setSelectedOtion] = useState<selectOptionType>("TEXT");

    const selectOption:selectOptionType[] = ["TEXT","PASSWORD",  "FILES"];

    const handleOptionClick = (e:selectOptionType)=>{
        console.log(e)
        setSelectedOtion(e)
    }



  return (
     <section className="shadow-2xl  flex-2 gap-9  rounded font-header font-semibold text-4xl bg-[#2E2B2C] label-sub-text-color h-96">
          <div className="flex justify-end">
            {
                selectOption.map((e:selectOptionType,index:number)=>(
                    <div key={index} onClick={()=>handleOptionClick(e)} className={`px-2 hover:cursor-pointer transition-colors ${selectedOption == e ? "text-white" : "hover:text-white"} `}>{e}</div>
                ))
            }
          </div>

            <div className=" h-5/6 grid place-items-center">
                {
                    selectedOption=="TEXT" ? <TEXT /> :
                    selectedOption=="PASSWORD" ? <PASSWORD /> : <FILES />
                }
            </div>

            

            
          </section>
  )
}

export default SendFiles