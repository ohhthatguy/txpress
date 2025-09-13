import {useState} from 'react'

const PASSWORD = () => {
 const [pswrdData, setPswrdData] = useState<string>('')
 
     const handlePswrdSend = ()=>{
         console.log(pswrdData)
     }
 
   return (
     <div className=" p-2 grid w-10/12">


<label className="input input-neutral w-full">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
      ></path>
      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
    </g>
  </svg>

  <input
    type="password"
    className="p-2  text-white w-full"
    required
    placeholder="Enter Password here"
    name="password"
         value={pswrdData}
         onChange={(e)=>setPswrdData(e.target.value)}
  />
</label>

       
       <div className=" text-right">
         <button onClick={handlePswrdSend} className="btn btn-active">Send</button>
       </div>
     </div>
   );
}

export default PASSWORD