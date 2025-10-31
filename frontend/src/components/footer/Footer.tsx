function Footer() {
  const getStartedData = [
    {
      title: "Send / Recieve",
      subTitle: `Depending on what you want to do, click "Send" or "Recieve" buttons above!`,
      image: "/sendRecieve.PNG",
      alt: "Send / Recieve image"
    },

    {
      title: "Connecting Code",
      subTitle: `The sender will generate a 6 digit Numeric Code. To connect with the Reciever, the sender must 
                        share it with the reciever. The code will expire after 60 sec, afterwhich it needs to be Regenerated.`,
      image: "/image2.png",
      alt: "Connecting Code image"
    },

    {
      title: "Successfull Connection",
      subTitle: `After the users are connected, they can share text / passwords and files with each other. These can be easily downloaded.
                        (Max Documnet size: 10MB & Max Video size: 100MB)`,
      image: "/image3.png",
      alt: "Successfull Connection image"
    },
  ];

//   title texrt-6xl 
// subtitle text-xl

  return (
    <>
      <div className=" flex flex-col gap-5 mt-9  bg-footer-color ">
        {/* font-header  */}
        <h1 className="text-style-gettingStarted-title font-poppins my-3 ">Getting Started:</h1>
        {/* <div className="bred"></div> */}

        <div className="flex gap-16 flex-col p-3">
        {getStartedData?.map((e, index) => (

          <section className={`md:flex footer-animation  gap-5 ${(index%2===0) ? "flex-row-reverse " : "flex-row-reverse bg-white-color"}`} key={index}>
            <div className="flex-1">
              <h2 className={` font-poppins text-style-gettingStarted-title font-bold ${(index%2===0) ? "p-2" : "text-black-color p-2"}`}>{e.title}</h2>
              <div className="bred"></div>
              <h4 className={` font-inter text-style-gettingStarted-subTitle ${(index%2===0) ? "p-2" : "label-sub-text-color font-semibold p-2"}`}>{e.subTitle}</h4>
            </div>

            <div className={`flex-1 `}>
                <img src={e.image} className=" object-fill h-full w-full"  />
            </div>

         
          </section>
          
        ))}
        </div>


        <section className=" text-center  body-white-color bg-body-color">
          <span className=" font-poppins text-xl "> Just Connect and Share resources! </span>{" "}
          <br />
          <span className=" font-inter label-sub-text-color ">
          No need to go through headache of signing and logging in just to get
          some small piece of data!</span>
        </section>

      </div>
    </>
  );
}

export default Footer;
