import Label from "./header/Label";
import InitialCard from "./initial/InitialCard";
import SendCard from "./send/SendCard";
import RecieveCard from "./recieve/RecieveCard";
import Footer from "./footer/Footer";

import useGetContextData from "../hooks/useGetContextData";


const LandingPage = () => {
  const context = useGetContextData();
  const {cardData} = context;

  return (
    <>
        <Label />

        {
          cardData?.cardStatus == 'send' ? <SendCard /> :
          cardData?.cardStatus == 'recieve' ? <RecieveCard /> :
           <InitialCard /> 

        }
        
       <Footer/>
    </>
  )
}

export default LandingPage