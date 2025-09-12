
import useGetContextData from "../../hooks/useGetContextData"
import MainRecievePart from "./MainRecieveCard";

const RecieveCard = () => {
  const context = useGetContextData();
  const { cardData, setCardData } = context;
  return (
   <div className="rounded flex p-3 bg-white-color text-black-color">
        <section className="flex-1 ">
        <h1 className="font-header font-semibold text-4xl">
          {cardData?.cardHeader}
        </h1>
        <h4 className="font-medium label-sub-text-color leading-tight mt-3">
          {cardData?.cardContent}
        </h4>
      </section>

      <MainRecievePart />
     
    </div>
  )
}

export default RecieveCard