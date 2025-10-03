import { Server, Socket } from "socket.io";

const OTP = (io: Server, socket: Socket, otpStore:{ senderId: string; generatedCode: number }[]) => {
  const generateOTP = (senderId: string) => {
    console.log("generate OTP");

    const code = Math.floor(Math.random() * 1000000);
    otpStore.push({ senderId, generatedCode: code });
    console.log(otpStore);
    socket.emit("generated-otp", code);
  };

  const checkOTP = (val:Number, recieverId: string) => {
    console.log("checkOTP");

    const matched = otpStore?.find(e => e.generatedCode == val)

    if(matched){

        const roomId = `room-${matched.senderId}-${recieverId}`;

        socket.join(roomId); //reciever joins room as he is curently here
        io.sockets.sockets.get(matched.senderId)?.join(roomId); // sender joins

        io.to(roomId).emit("room-joined"); // notifying room joined

        otpStore = otpStore.filter(e => e.generatedCode !== val)


    }else{
        socket.emit("wrong-otp-entered");
    }

  };

  socket.on("generate-otp", generateOTP);
  socket.on("checks-otp-reciever-side", checkOTP);
};

export default OTP;
