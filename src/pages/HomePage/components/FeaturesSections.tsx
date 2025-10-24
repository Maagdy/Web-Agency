import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { laptopBG, phoneIMG } from "../../../common/assets/images";
import { Button, Text } from "../../../components/common";
import {
  developmentItems,
  featuresItems,
  iconButtons,
} from "../../../common/constants/aboutItems";

function FeaturesSection() {
  return (
    <>
      <div
        className="relative  min-w-full min-h-screen flex md:justify-end justify-center items-center md:px-0 lg:px-20 bg-no-repeat"
        style={{
          backgroundImage: `url(${laptopBG})`,
          backgroundPosition: "left center",
        }}
      >
        <div className="absolute inset-0 bg-white/35 block md:hidden z-0"></div>

        <section className="md:w-[50%] flex flex-col md:h-auto h-[90vh] items-center md:items-start gap-6 p-5 -mt-[10%] md:bg-white/70 text-[var(--mainColor)] max-w-xl z-1">
          <h2 className="text-3xl relative lg:text-4xl font-bold uppercase leading-tight text-center md:text-left">
            Website <br />
            Design <br />
            <span className="hidden md:block absolute top-11 right-42 w-[80px] h-[6px] bg-cyan-400 rounded"></span>
          </h2>

          <Text className="text-sm sm:text-base lg:text-lg xl:text-xl text-center md:text-justify p-4 sm:p-6 md:p-0">
            Web design encompasses many different skills and disciplines in the
            production and maintenance of websites. the design process relating
            to the front-end design of a website
          </Text>

          <div className="flex flex-col w-full items-start md:items-center md:grid md:grid-cols-2 lg:grid-cols-3 px-4 md:p-0 gap-6">
            {featuresItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-1 group cursor-auto"
              >
                <span className="flex items-center justify-center lg:w-8 lg:h-8 rounded-full bg-transparent group-hover:bg-[var(--mainColor)] transition-colors duration-300">
                  <CheckCircleOutlineRoundedIcon className="w-5 h-5 text-cyan-600 group-hover:text-gray-400 transition-colors duration-300" />
                </span>
                <span className="text-[var(--mainColor)] font-bold text-lg transition-colors duration-300">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
      <hr
        style={{
          opacity: "0.1",
        }}
      />

      <div className="flex flex-col md:flex-row items-center justify-center w-full mt-20 px-6 sm:px-10 md:px-20 lg:px-32 whitespace-break-spaces">
        <section className="relative flex flex-col items-center md:items-start gap-6 -mt-10 text-[var(--mainColor)]">
          <span className="hidden md:block absolute top-11 -left-20 w-16 h-1.5 bg-cyan-400 rounded"></span>
          <h2 className="text-3xl lg:text-4xl font-bold uppercase leading-tight text-center md:text-left relative">
            App <br />
            Development <br />
          </h2>

          <Text className="text-sm sm:text-base lg:text-lg xl:text-xl text-center md:text-justify px-4 sm:px-6 md:px-0">
            App development encompasses many different skills and disciplines in
            the production and maintenance of websites. App development
            encompasses many different skills and disciplines in the production
            and maintenance of websites.
          </Text>

          <div className="grid grid-cols-2 gap-6 px-4 md:p-0 w-full">
            {developmentItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 group cursor-auto"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-transparent group-hover:bg-[var(--mainColor)] transition-colors duration-300">
                  <CheckCircleOutlineRoundedIcon className="w-5 h-5 text-cyan-600 group-hover:text-gray-100 transition-colors duration-300" />
                </span>
                <span className="text-[var(--mainColor)] font-bold text-lg transition-colors duration-300">
                  {item.title}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 md:mb-10 sm:gap-12 mt-4 w-full">
            {iconButtons.map((button) => (
              <Button
                key={button.id}
                variant="primary"
                size="md"
                iconLeft={<button.icon />}
              >
                {button.title}
              </Button>
            ))}
          </div>
        </section>

        <section className="flex justify-center w-full mt-10 md:mt-0">
          <img
            src={phoneIMG}
            loading="lazy"
            alt="PHONE IMAGE"
            className="max-w-[300px] md:max-w-full h-auto"
          />
        </section>
      </div>
    </>
  );
}

export default FeaturesSection;
