import { createContext, useState } from "react";
import type { CardType } from "./types";
import type { ReactNode } from "react";
import { Socket } from "socket.io-client";

interface GlobalContextType {
  cardData: CardType | null;
  setCardData: React.Dispatch<React.SetStateAction<CardType | null>>;
  otpFromServer: number | null;
  setOtpFromServer: React.Dispatch<React.SetStateAction<number | null>>;
  socket: Socket | undefined,
  setSocket: React.Dispatch<React.SetStateAction<Socket | undefined>>;
}

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cardData, setCardData] = useState<CardType | null>({
    cardHeader: "Share Your Files Effortlessly",
    cardContent:
      "But first, let's make sure sender and reciever are both connected with each other.",
    cardStatus: "initial",
  });

  const [otpFromServer, setOtpFromServer] = useState<number | null>(null);

  const [socket, setSocket] = useState<Socket | undefined>(undefined);

  return (
    <GlobalContext.Provider
      value={{ cardData, setCardData, otpFromServer, setOtpFromServer,socket, setSocket }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
