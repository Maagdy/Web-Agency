import RadarSharpIcon from "@mui/icons-material/RadarSharp";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "../../../index.css";
import PageBackground from "../../../components/UI/PageBackground";
import { Text } from "../../../components/common";
import { countUpItems } from "../../../common/constants/countUpItems";
import CountUpCard from "../../../components/UI/CountUpCard";
import { team1 } from "../../../common/assets/images";
import { memberCardArr } from "../../../common/constants/cardsContent";
import MemberCard from "../../../components/UI/MemberCard";
import { clients } from "../../../common/constants/aboutItems";
import { ClientCard } from "../../../components/UI/ClientCard";

const AboutContent = () => {
  return (
    <>
      <PageBackground />
      <div className="flex flex-col md:flex-row px-6 lg:gap-32 md:gap-20 gap-10 items-center md:items-start md:py-12 my-10 max-w-6xl mx-auto">
        <aside>
          <h2 className="md:text-3xl pt-1 text-4xl relative text-[var(--mainColor)] lg:text-4xl font-bold uppercase leading-tight text-center md:text-left">
            Who <br />
            We <br />
            Are?
            <span className="hidden md:block absolute top-17 right-28 w-[70px] h-[6px] bg-cyan-400 rounded"></span>
          </h2>
        </aside>

        <section className="flex flex-col text-center md:text-justify whitespace-break-spaces gap-6 mt-2">
          <Text>
            Web design encompasses many different skills and disciplines in the
            production and maintenance of websites. The different areas of web
            design include web graphic design; interface design; authoring,
            including standardised code and proprietary software; user
            experience design; and search engine optimization.
          </Text>
          <Text>
            Web design encompasses many different skills and disciplines in the
            production and maintenance of websites. The different areas of web
            design include web graphic design; interface design.
          </Text>
          <Text>
            authoring, including standardised code and proprietary software;
            user experience design; and search engine optimization.
          </Text>
          <Text>
            Web design encompasses many different skills and disciplines in the
            production and maintenance of websites. The different areas of web
            design include web graphic design; interface design.
          </Text>
        </section>
      </div>
      <div className="bg-[var(--mainColor)] flex flex-col lg:flex-row items-center justify-center py-10 lg:py-25 mt-10 px-15 w-full">
        <section className="flex items-center justify-center lg:justify-center w-full md:w-1/3 mb-10 md:mb-0">
          <h2 className="relative text-4xl md:text-3xl lg:text-4xl font-bold uppercase leading-tight text-white text-center md:text-left">
            Our Stats
            <span className="hidden lg:block absolute top-1/2 -translate-y-1/2 -left-22 w-[70px] h-[6px] bg-cyan-400 rounded"></span>
          </h2>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 w-full md:w-2/3 ">
          {countUpItems.slice(0, 3).map((item, index) => (
            <CountUpCard
              key={index}
              label={item.label}
              number={item.number}
              delay={item.delay}
              suffix={item.suffix}
              className="text-white text-5xl"
            />
          ))}
        </section>
      </div>
      <div className="flex flex-col md:flex-row w-full ">
        <section className="flex flex-col items-center justify-center text-center gap-16 text-[var(--mainColor)] px-6 sm:px-10 md:px-20 lg:px-32 w-full md:w-1/2">
          <h2 className="text-3xl lg:text-4xl font-bold uppercase leading-tight relative">
            Our Mission
            <span className="hidden md:block absolute top-18 right-22 w-16 h-1.5 bg-cyan-400 rounded"></span>
          </h2>
          <Text className="px-4 sm:px-0">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam
            cursus. Morbi ut mi. Nullam enim leo, egestas id, condimentum at,
            laoreet mattis, massa. Sed eleifend nonummy diam.
          </Text>
          <button className="flex items-center gap-2 border text-white font-bold rounded-[28px] px-6 py-2 text-base shadow-sm transition-all duration-300 bg-[var(--mainColor)] hover:bg-white hover:text-[var(--mainColor)] hover:shadow-md cursor-pointer">
            <RadarSharpIcon />
            Learn More
          </button>
        </section>
        <section className="flex items-center justify-center w-full md:w-1/2">
          <img
            src={team1}
            alt="TEAM IMAGE"
            loading="lazy"
            className="max-w-full h-auto"
          />
        </section>
      </div>
      <div className="bg-[var(--mainColor)] flex flex-col lg:flex-row items-center lg:items-start justify-center py-10 lg:py-30 mt-10 px-4 sm:px-8 md:px-16 xl:px-24 w-full">
        <h2 className="relative text-3xl sm:text-4xl md:text-5xl font-bold uppercase leading-tight text-white text-center lg:text-left mb-10 lg:mb-0 lg:mr-12">
          Our Team
          <span className="hidden lg:block absolute top-1/2 -translate-y-1/2 -left-20 w-[70px] h-[6px] bg-cyan-400 rounded"></span>
        </h2>
        <div className="w-full flex flex-col items-center sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {memberCardArr.map((member, index) => (
            <MemberCard
              key={index}
              imgSrc={member.imgSrc}
              name={member.name}
              role={member.role}
              socialLinks={member.socialLinks}
            />
          ))}
        </div>
      </div>
      <div className="w-full md:py-30 py-15 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 relative">
        <section className="relative flex flex-col items-center gap-6 text-[var(--mainColor)] mb-14">
          <h1 className="text-4xl font-semibold">Our Clients</h1>
          <span className="absolute top-18 w-20 h-1.5 bg-cyan-400 rounded"></span>
        </section>
        <Swiper
          modules={[Navigation]}
          navigation
          centerInsufficientSlides
          loop={true}
          slidesPerView={1}
          spaceBetween={16}
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 16 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 28 },
          }}
          className="mySwiper"
          style={{ padding: "20px 40px" }}
        >
          {clients.map((item) => (
            <SwiperSlide key={item.id} className="pointer-events-none">
              <ClientCard id={item.id} image={item.image} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default AboutContent;
