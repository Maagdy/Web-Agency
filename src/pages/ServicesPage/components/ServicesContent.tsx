import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ArrowRightAltSharpIcon from "@mui/icons-material/ArrowRightAltSharp";
import PageBackground from "../../../components/UI/PageBackground";
import {
  pricingCardArr,
  serviceCardArr,
  staticServiceCardArr,
} from "../../../common/constants/cardsContent";
import ServiceCard from "../../../components/UI/ServiceCard";
import { Button, Text } from "../../../components/common";
import PricingCard from "../../../components/UI/PricingCard";
import { drawerBackground } from "../../../common/assets/images";
import StaticServiceCard from "../../../components/UI/StaticServiceCard";
import FeaturesSection from "../../HomePage/components/FeaturesSections";

function ServicesContent() {
  return (
    <>
      <PageBackground />

      <div className="flex flex-col items-center bg-white">
        <section className="flex flex-wrap md:flex-nowrap justify-center gap-6 lg:gap-14 -mt-20 w-full  px-4">
          {serviceCardArr.map((service, index) => (
            <ServiceCard
              imgSrc={service.imgSrc}
              title={service.title}
              description={service.description}
              key={index}
            />
          ))}
        </section>

        <div className="flex flex-col bg-[var(--mainColor)] text-white md:flex-row mt-[10%] md:mt-[5%] max-w-7xl mx-auto p-14 md:p-20 items-center md:items-start gap-10 md:gap-20">
          <aside className="md:ml-10">
            <h2 className="md:text-3xl pt-1 text-4xl relative lg:text-4xl font-bold uppercase leading-tight text-center md:text-left">
              Who <br /> Choose <br /> Us?
              <span className="hidden md:block absolute top-17 -left-18 w-[50px] h-[6px] bg-cyan-400 rounded"></span>
            </h2>
          </aside>
          <section className="flex flex-col text-center md:text-justify whitespace-break-spaces gap-6 mt-2">
            <Text className="text-white">
              Web design encompasses many different skills and disciplines in
              the production and maintenance of websites. The different areas of
              web design include web graphic design; interface design;
              authoring, including standardised code and proprietary software;
              user experience design; and search engine optimization.
            </Text>
          </section>
        </div>

        <div className="flex flex-col items-center gap-6 justify-center mt-16 xl:mb-15">
          <h2 className="text-3xl lg:text-4xl font-bold uppercase leading-tight text-center text-[var(--mainColor)]">
            Our Pricing
          </h2>
          <span className="w-[60px] h-[4px] bg-cyan-400"></span>
          <Text className="text-center text-gray-700 max-w-4xl px-4 sm:px-6 md:px-8 lg:px-0 text-sm sm:text-base lg:text-lg xl:text-xl">
            Web design encompasses many different skills and disciplines in the
            production and maintenance of websites.
          </Text>

          <div className="w-full">
            <section className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-8 lg:gap-14 my-20 w-full px-4 place-items-center">
              {pricingCardArr.map((card, index) => (
                <PricingCard
                  duration={card.duration}
                  planName={card.planName}
                  price={card.price}
                  popular={card.popular}
                  className={index === 1 ? "md:-mt-10" : ""}
                  key={index}
                />
              ))}
            </section>
          </div>
        </div>
        <div
          className="w-full md:-mt-[15%] text-white min-h-[50vh] flex flex-col md:flex-row gap-10 md:gap-30 py-10 md:pt-20 px-5 mb-5 items-center justify-center md:justify-evenly"
          style={{
            backgroundImage: `url(${drawerBackground})`,
            backgroundPosition: "top",
            backgroundSize: "cover",
            objectFit: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <section className="flex items-center flex-col md:flex-row  justify-center gap-6">
            <span className="bg-white text-6xl p-4 rounded-lg flex items-center justify-center">
              <ChatOutlinedIcon
                fontSize="inherit"
                className="text-black transform -scale-x-100"
              />
            </span>

            <div className="flex flex-col items-center md:items-start text-center md:text-left ">
              <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                Need Custom Service?
              </h2>
              <p className="text-lg lg:text-xl leading-relaxed mt-2">
                Contact us today to discuss your specific needs and get a
                personalized service.
              </p>
            </div>
          </section>
          <Button
            variant="secondary"
            size="lg"
            iconRight={<ArrowRightAltSharpIcon />}
            className="text-nowrap"
          >
            Contact Us
          </Button>
        </div>
      </div>
      <FeaturesSection />
      <div className="bg-[var(--mainColor)] pt-10 w-full">
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

export default ServicesContent;
