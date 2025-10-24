import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import IosShareIcon from "@mui/icons-material/IosShare";

import "../../../index.css";

import "swiper/css";
import "swiper/css/navigation";
import { drawerBackground } from "../../../common/assets/images";
import { clients, swiperContent } from "../../../common/constants/aboutItems";
import { Button } from "../../../components/common";
import { ClientCard } from "../../../components/UI/ClientCard";
import { staticServiceCardArr } from "../../../common/constants/cardsContent";
import StaticServiceCard from "../../../components/UI/StaticServiceCard";

function TestimonialsSection() {
  return (
    <>
      <div
        className="h-full flex flex-col justify-center items-center p-10"
        style={{
          backgroundImage: `url(${drawerBackground})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          objectFit: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <section className="relative flex flex-col items-center gap-6 text-white mb-10">
          <h1 className="text-4xl font-bold">Our Works</h1>
          <span className="absolute top-16 w-20 h-1.5 bg-cyan-400 rounded"></span>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl lg:text-justify text-center p-4 sm:p-6 md:p-8">
            Web design encompasses many different skills and disciplines in the
            production
          </p>
        </section>
        <section className="w-full curved-edge-reversed max-w-6xl">
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            {swiperContent.map((item) => (
              <SwiperSlide key={item.id}>
                <div
                  className={`flex flex-col ${
                    item.location === "right"
                      ? "md:flex-row-reverse"
                      : "md:flex-row"
                  } items-center justify-center gap-8 px-6 sm:px-10 md:px-16 lg:px-24`}
                >
                  <img
                    src={item.image}
                    loading="lazy"
                    alt="DRAWER IMAGE"
                    className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl object-contain rounded-xl"
                  />

                  <section className="flex flex-col items-center sm:items-start  px-10 md:px-0 gap-4 w-full text-white font-bold mt-6 md:mt-0">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-6">
                      {item.title}
                    </h1>

                    <h2 className="text-sm sm:text-base md:text-lg">
                      <span className="text-cyan-500">Client: </span>
                      {item.websiteDetails?.client}
                    </h2>
                    <h2 className="text-sm sm:text-base md:text-lg">
                      <span className="text-cyan-500">Color: </span>
                      {item.websiteDetails?.color}
                    </h2>
                    <h2 className="text-sm sm:text-base md:text-lg">
                      <span className="text-cyan-500">Platform: </span>
                      {item.websiteDetails?.platform}
                    </h2>
                    <h2 className="text-sm sm:text-base md:text-lg">
                      <span className="text-cyan-500">Year: </span>
                      {item.websiteDetails?.year}
                    </h2>

                    <Button
                      variant="secondary"
                      className="mt-6 px-5 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base"
                      iconLeft={
                        <IosShareIcon className="text-base sm:text-lg" />
                      }
                    >
                      Launch Website
                    </Button>
                  </section>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </div>
      <div className="relative w-full h-50">
        <div className="absolute inset-0 w-full curved-edge-reverse"></div>
        <div className="relative md:top-[50%] top-[35%] w-full flex justify-center z-10">
          <button className="text-nowrap flex items-center gap-2 px-10 py-4 text-lg font-bold text-[var(--mainColor)] bg-white rounded-full hover:bg-cyan-400 transition-all duration-300 cursor-pointer">
            <IosShareIcon className="text-lg" />
            View Our Portfolio
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-6 text-[var(--mainColor)] mt-15">
        <section className="relative flex flex-col items-center gap-6 text-[var(--mainColor)]">
          <h1 className="text-4xl font-bold uppercase">Our Clients</h1>
          <span className="absolute top-16 w-20 h-1.5 bg-cyan-400 rounded"></span>
        </section>
        <section className="w-full relative overflow-visible max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 mb-10 px-6 lg:px-12 justify-items-center">
          {clients.map((client) => (
            <ClientCard key={client.id} id={client.id} image={client.image} />
          ))}
        </section>
      </div>
      <div className="bg-[var(--mainColor)] w-full mt-30 relative">
        <div className="curved-bg-flatter absolute -top-25 w-full"></div>
        <div className="flex flex-col lg:flex-row mx-5 justify-center items-center pt-10 gap-12">
          <div className="relative bg-cyan-400 flex w-full lg:w-[380px] h-auto lg:h-[260px] rounded-lg shadow-xl drop-shadow-xl flex-col justify-start lg:justify-center items-center lg:items-start mx-4 lg:mx-2 p-10">
            <h1 className="font-bold text-[var(--mainColor)] mb-4">
              Our Services
            </h1>
            <p className="text-[var(--mainColor)] text-center lg:text-start text-4xl font-bold ">
              DO YOU
              <br />
              NEED
              <br />
              APP?
            </p>
          </div>
          {staticServiceCardArr.map((card, index) => (
            <StaticServiceCard
              key={index}
              imgSrc={card.imgSrc}
              description={card.description ?? ""}
              title={card.title}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default TestimonialsSection;
