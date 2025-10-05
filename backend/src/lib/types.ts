export type SharedFileType = {
  name: string;
  size: number;
  url: string;
};

export type SharedDataType = {
  type: "TEXT" | "PASSWORD" | "FILE";
  data: string | SharedFileType;
  time: string;
};

export type OTPStoreType = {
  senderId: string;
  generatedCode: number;
  recieverId?: string;
  roomId?: string;
  senderStatus?: "Connected" | "Disconnected" | "Not Connected Yet";
  recieverStatus?: "Connected" | "Disconnected" | "Not Connected Yet";
};
