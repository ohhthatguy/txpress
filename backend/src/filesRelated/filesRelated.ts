import { Server, Socket } from "socket.io";


const filesRelated = (io:Server, socket:Socket) => {

    const sendfiles = ()=>{
        console.log("send files");
    }

    
    const recievefiles = ()=>{
        console.log("recieve files");
    }

 socket.on("send:files", sendfiles);
 socket.on("recieve:files", recievefiles);

}

export default filesRelated