import useGetContextData from "../../hooks/useGetContextData"
import NavigationBtn from "../navigation/NavigationBtn";


const SidePart = () => {
     const context = useGetContextData();
  const { cardData } = context;

  return (
    <section className="flex-1 flex flex-col">
        <h1 className="font-header font-semibold text-4xl">
          {cardData?.cardHeader}
        </h1>
        <h4 className="font-medium label-sub-text-color leading-tight mt-3 flex-1">
          {cardData?.cardContent}
        </h4>

        <div >
          <NavigationBtn />
        </div>
      </section>

  )
}

export default SidePart