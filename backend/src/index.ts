import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";

import textRelated from "./textRelated/textRelated";
import passwordRelated from "./passwordRelated/passwordRelated";
import filesRelated from "./filesRelated/filesRelated";


  const app = express();
  const httpServer = http.createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  app.listen(6969, () => {
    console.log(`{Server is active at port ${6969}`);
    console.log("a small change")
  });


  const handleConnectionEntry = (socket: Socket) =>{
    console.log("Connected socket in backend")
    textRelated(io, socket);
    passwordRelated(io, socket);
    filesRelated(io, socket);
  }



//main code
io.on("connection", handleConnectionEntry);

