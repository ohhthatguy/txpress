import { Server, Socket } from "socket.io";
import type { OTPStoreType } from "../lib/types";

const OTP = (io: Server, socket: Socket, otpStore:OTPStoreType[]) => {
  const generateOTP = (senderId: string) => {
    console.log("generate OTP");

    const code = Number(Math.floor(Math.random() * 1000000).toString().padStart(6, "0"));
    
    otpStore.push({ senderId, generatedCode: code, senderStatus:"Connected", recieverStatus:"Not Connected Yet" });
    console.log(otpStore);
    socket.emit("generated-otp", code);
  };

  const checkOTP = (val:Number, recieverId: string) => {
    console.log("checkOTP");

    const matched = otpStore?.find(e => e.generatedCode == val && e.recieverStatus == "Not Connected Yet"); 

    if(matched){

        const roomId = `room-${matched.senderId}-${recieverId}`;

        socket.join(roomId); //reciever joins room as he is curently here
        io.sockets.sockets.get(matched.senderId)?.join(roomId); // sender joins

        io.to(roomId).emit("room-joined"); // notifying room joined

        const index = otpStore.findIndex(e=> e.senderId == matched.senderId);
        otpStore[index] = {...otpStore[index], recieverId, roomId, recieverStatus:"Connected" }

        // otpStore = otpStore.filter(e => e.generatedCode !== val)
        console.log(otpStore)

    }else{
        socket.emit("wrong-otp-entered");
    }

  };

  socket.on("generate-otp", generateOTP);
  socket.on("checks-otp-reciever-side", checkOTP);
};

export default OTP;
