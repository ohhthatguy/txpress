import useGetContextData from "../../hooks/useGetContextData"
import NavigationBtn from "../navigation/NavigationBtn";


const SidePart = () => {
     const context = useGetContextData();
  const { cardData } = context;
// text-4xl
  return (
    <section className="flex-1 flex flex-col">
        <h1 className="font-header font-semibold  text-style-sideBar-Title ">
          {cardData?.cardHeader}
        </h1>
        <h4 className="font-medium label-sub-text-color text-style-sideBar-subTitle leading-tight mt-3 flex-1">
          {cardData?.cardContent}
        </h4>
{
 cardData?.cardStatus!== "initial" &&  <div>
          <NavigationBtn />
        </div>
}
       
      </section>

  )
}

export default SidePart