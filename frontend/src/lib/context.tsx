import { createContext, useState } from "react";
import type { CardType } from "./types";
import type { ReactNode } from "react";

interface GlobalContextType {
  cardData: CardType | null;
  setCardData: React.Dispatch<React.SetStateAction<CardType | null>>;
    otpFromServer: number;
  setOtpFromServer: React.Dispatch<React.SetStateAction<number>>;
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

  const [otpFromServer, setOtpFromServer] = useState<number>(999999);

  return (
    <GlobalContext.Provider value={{ cardData, setCardData,otpFromServer, setOtpFromServer }}>
      {children}
    </GlobalContext.Provider>
  );
};
