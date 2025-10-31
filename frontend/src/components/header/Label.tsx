import AnimatingSlide from "./AnimatingSlide";

const Label = () => {
  // text-9xl
  // text-4xl
  return (
    <>
      <section className="  ">
        
        <div className="font-header  text-style-mainHeader   body-white-color font-extrabold">
           TExPRESS
        </div>
        {/* <div className="font-header text-style-mainHeader-subTitle font-bold bred pt-3 rounded label-sub-text-color">
          <div>TEXT</div>
          <div>FILES</div>

          <div>PASSWORD</div>
        </div> */}

         <AnimatingSlide />
      </section>
    </>
  );
};

export default Label;
