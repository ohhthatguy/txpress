import { Server, Socket } from "socket.io";


const textRelated = (io:Server, socket:Socket) => {

    const sendText = ()=>{
        console.log("send text");
    }

    
    const recieveText = (text:string)=>{
        console.log("recieved text: ", text);
    }

 socket.on("send:text", sendText);
 socket.on("recieve:text", recieveText);

}

export default textRelated