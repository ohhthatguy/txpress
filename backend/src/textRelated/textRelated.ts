import { Server, Socket } from "socket.io";
import type { SharedDataType } from "../lib/types";


const textRelated = (io:Server, socket:Socket) => {

    const sendText = (text:SharedDataType)=>{
         console.log(" text from sender: ", text);

         socket.broadcast.emit("send-data->reciever", text);
      
    }

    
 

 socket.on("send:text", sendText);


}

export default textRelated