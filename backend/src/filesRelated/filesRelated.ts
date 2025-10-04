import { Server, Socket } from "socket.io";
import { SharedDataType } from "../lib/types";

const filesRelated = (io: Server, socket: Socket) => {
  const sendfiles = (data: SharedDataType) => {
    console.log("send files", data);

    socket.broadcast.emit("send-data->reciever", data);
  };

  socket.on("send:files", sendfiles);
};

export default filesRelated;
