import { Server, Socket } from "socket.io";
import type { SharedDataType } from "../lib/types";


const passwordRelated = (io:Server, socket:Socket) => {

    const sendpassword = (pswrd:SharedDataType)=>{
        console.log("send password: ", pswrd);
        socket.broadcast.emit("send-data->reciever", pswrd);
    }

    
    

 socket.on("send:password", sendpassword);


}

export default passwordRelated