import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";


import cors from "cors";

import { handleUpload, upload } from "./filesRelated/FilesUpload";





import textRelated from "./textRelated/textRelated";
import passwordRelated from "./passwordRelated/passwordRelated";
import filesRelated from "./filesRelated/filesRelated";
import OTP from "./OTP/OTP";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

let otpStore: { senderId: string; generatedCode: number }[] = [];

const handleConnectionEntry = (socket: Socket) => {
  console.log("Connected socket in backend");

  OTP(io, socket, otpStore);
  textRelated(io, socket);
  passwordRelated(io, socket);
  filesRelated(io, socket);

  socket.on("disconnect", (reason) => {
    console.log("socket disconnected: ", socket.id);
    console.log("reason of disconnect: ", reason);

    otpStore = otpStore.filter((e) => e.senderId !== socket.id);

    console.log("list: ", otpStore);
  });
};

//main code
io.on("connection", handleConnectionEntry);

httpServer.listen(6969, () => {
  console.log(`Server is active at port ${6969}`);
});


// Allow your frontend origin
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  methods: ["GET","POST","PUT","DELETE"],
 
}));


app.use("/upload", upload.single("file"), handleUpload);

app.listen(7000, () => {
  console.log("mern sever is at this, 7000");
});


