import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";

import cors from "cors";
import { handleUpload, upload } from "./filesRelated/FilesUpload";

import textRelated from "./textRelated/textRelated";
import passwordRelated from "./passwordRelated/passwordRelated";
import filesRelated from "./filesRelated/filesRelated";
import OTP from "./OTP/OTP";
import type { OTPStoreType } from "./lib/types";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const httpServer = http.createServer(app);

const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? (process.env.CLIENT_URL as string)
    : "http://localhost:5173";

const io = new Server(httpServer, {
  cors: {
    origin: [FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

let otpStore: OTPStoreType[] = [];

const handleConnectionEntry = (socket: Socket) => {
  console.log("Connected socket in backend");

  OTP(io, socket, otpStore);
  textRelated(io, socket);
  passwordRelated(io, socket);
  filesRelated(io, socket);

  socket.on("disconnect", (reason) => {
    console.log("socket disconnected: ", socket.id);
    console.log("reason of disconnect: ", reason);

    const index = otpStore.findIndex(
      (e) => socket.id == e.senderId || socket.id == e.recieverId
    );
    console.log(index);

    if (index == -1) {
      console.log("no index found for disconnect");
      return;
    }

    const roomId = otpStore[index].roomId;
    socket.to(roomId!).emit("communication-lost"); // notifying room joined prob here!!!

    otpStore.splice(index, 1);

    console.log("list: ", otpStore);
  });
};

//main code
io.on("connection", handleConnectionEntry);

const PORT = process.env.PORT || 4000;

// Allow your frontend origin
app.use(
  cors({
    origin: [FRONTEND_URL], // your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/upload", upload.single("file"), handleUpload);

httpServer.listen(PORT, () => {
  console.log(`Server is active at port ${PORT}`);
});
