import useGetContextData from "../../hooks/useGetContextData";
import SidePart from "../../common/sidePart/SidePart";

const InitialCard = () => {
  const context = useGetContextData();
  const { setCardData } = context;

  const handleSendClick = () => {
    const CardTypeSend = {
      cardHeader: "About to Send Files ?",
      cardContent:
        "First connect to the reciever you want to share your files with",
      cardStatus: "send" as const,
    };

    setCardData(CardTypeSend);
  };

  const handleRecieveClick = () => {
    const CardTypeRecieve = {
      cardHeader: "looking for those sent files ?",
      cardContent: "First connect to the sender you want to recieve files with",
      cardStatus: "recieve" as const,
    };
    setCardData(CardTypeRecieve);
  };

  return (
    <div className="rounded md:flex p-3  bg-white-color text-black-color">
      <SidePart />

      <section className="gap-5  flex flex-col sm:flex-row  flex-2 h-72 md:h-96">
        <div
          onClick={handleSendClick}
          className=" transition-all shadow-2xl  hover:cursor-pointer hover:scale-95 scale-100 flex-1 rounded flex justify-center items-center font-header font-semibold  text-style-sendRecieve bg-[#2E2B2C] label-sub-text-color  "
        >
          {/* text-4xl */}
          SEND
        </div>
        <div
          onClick={handleRecieveClick}
          className="transition-all shadow-2xl  hover:cursor-pointer hover:scale-95 scale-100 flex-1 rounded flex justify-center items-center font-header font-semibold text-style-sendRecieve label-sub-text-color bg-[#2E2B2C] "
        >
          {/* text-4xl */}
          RECIEVE
        </div>
      </section>
    </div>
  );
};

export default InitialCard;
