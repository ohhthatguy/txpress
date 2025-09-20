import { Server, Socket } from "socket.io";


const passwordRelated = (io:Server, socket:Socket) => {

    const sendpassword = ()=>{
        console.log("send password");
    }

    
    const recievepassword = ()=>{
        console.log("recieve password");
    }

 socket.on("send:password", sendpassword);
 socket.on("recieve:password", recievepassword);

}

export default passwordRelated