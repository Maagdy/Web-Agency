import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { asideImg, banner, middleImg } from "../../../common/assets/images";
import { serviceCardArr } from "../../../common/constants/cardsContent";
import ServiceCard from "../../../components/UI/ServiceCard";
import StackedImages from "./StackedImages";
import { countUpItems } from "../../../common/constants/countUpItems";
import CountUpCard from "../../../components/UI/CountUpCard";

function HomeContent() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const sectionY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const imagesY = useTransform(scrollYProgress, [0, 1], ["-25%", "35%"]);

  // className="home-background flex flex-col h-full xl:pt-[20%] lg:pt-[25%] md:pt-[30%] sm:pt-[35%] pt-[45%]"

  return (
    <>
      <motion.div
        ref={containerRef}
        style={{
          backgroundImage: `url(${banner})`,
          backgroundPositionY: backgroundY,
        }}
        className="home-background flex flex-col h-full xl:pt-[12%] lg:pt-[15%] md:pt-[18%] pt-[15%]  "
      >
        <motion.section style={{ y: sectionY }} className="mb-16">
          <h1 className="typewriter text-4xl sm:text-[45px] md:text-[54px] lg:text-6xl xl:text-7xl text-center font-bold uppercase mb-4 sm:mb-6 md:mb-8">
            Web design agency in NYC
          </h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-50 text-center leading-normal px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.5, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            viewport={{ once: true }}
          >
            Web design encompasses many different skills and disciplines in the
            <br className="hidden sm:block" />
            production and maintenance of websites.
          </motion.p>
        </motion.section>

        <motion.div
          className="flex justify-center items-center relative"
          style={{ y: imagesY }}
        >
          <div className="relative flex justify-center items-center w-full max-w-[90rem] mb-10 ">
            <motion.img
              src={asideImg}
              alt="aside img"
              loading="lazy"
              className="w-full h-auto mb-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.5 }}
            />
            <motion.img
              src={middleImg}
              alt="middle img"
              loading="lazy"
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2 }}
            />
          </div>
        </motion.div>
      </motion.div>
      <div className="curved-bg z-20 -mt-20 sm:-mt-24 md:-mt-32 lg:-mt-40 flex flex-col px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 h-auto lg:h-[500px] xl:h-[600px] text-white">
        <div className="flex flex-col md:flex-row justify-around items-center gap-4 md:gap-12">
          <section className="flex md:flex-row items-center gap-6">
            <span className="hidden md:flex w-[60px] h-[4px] bg-cyan-400 self-center"></span>
            <h2 className="text-3xl lg:text-4xl font-bold uppercase leading-tight text-center md:text-left">
              Who <br /> We <br /> Are?
            </h2>
          </section>

          <section className="md:w-2/3 text-gray-200 leading-relaxed">
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl lg:text-justify text-center p-4 sm:p-6 md:p-8">
              Web design encompasses many different skills and disciplines in
              the production and maintenance of websites. The different areas of
              web design include web graphic design; interface design;
              authoring, including standardised code and proprietary software;
              user experience design; and search engine optimization.
            </p>
          </section>
        </div>
      </div>
      <div className="flex max-md:flex-wrap justify-center lg:justify-around gap-4 max-w-md:gap-10 items-center -mt-[10%]">
        {serviceCardArr.map((card, index) => (
          <ServiceCard
            key={index}
            imgSrc={card.imgSrc}
            title={card.title}
            className={index === 1 ? "md:-mt-28" : ""}
          />
        ))}
      </div>
      <div>
        <section className="flex flex-col items-center gap-6 justify-center mt-16 xl:mb-15 ">
          <h2 className="text-3xl lg:text-4xl font-bold uppercase leading-tight text-center text-[var(--mainColor)]">
            why us?
          </h2>
          <span className="w-[60px] h-[4px] bg-cyan-400"></span>
          <p className="text-center leading-relaxed text-gray-700 max-w-4xl px-4 sm:px-6 md:px-8 lg:px-0 text-sm sm:text-base lg:text-lg xl:text-xl">
            Web design encompasses many different skills and disciplines in the
            production and maintenance of websites. The different areas of web
            design include web graphic design interface design.
          </p>
        </section>
        <StackedImages />
        <section className="grid grid-cols-2 lg:grid-cols-4 -mt-25 gap-8 px-4 sm:px-6 md:px-8 lg:px-0">
          {countUpItems.map((item, index) => (
            <CountUpCard
              key={index}
              label={item.label}
              number={item.number}
              delay={item.delay}
              suffix={item.suffix}
            />
          ))}
        </section>
      </div>
    </>
  );
}

export default HomeContent;
