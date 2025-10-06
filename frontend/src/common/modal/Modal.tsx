function Modal({text,setIsConnectionLost}: {text:string,setIsConnectionLost:React.Dispatch<React.SetStateAction<Boolean>>}) {
  return (
    <dialog id="my_modal_2" className="modal  sm:modal-middle label-sub-text-color font-header font-semibold text-4xl" open>
      <div className="modal-box">
    <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>setIsConnectionLost(false)}>✕</button>
    </form>
    <h3 className="font-bold text-lg">Connection Lost</h3>
    <p className="py-4">{text}</p>
  </div>
    </dialog>
  );
}

export default Modal;
