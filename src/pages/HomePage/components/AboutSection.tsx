import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Button as MUIButton } from "@mui/material";
import {
  aboutItemButtons,
  aboutItems,
} from "../../../common/constants/aboutItems";
import { socialMediaIcons } from "../../../common/constants/socialIcons";
import { Button } from "../../../components/common";

const AboutSection = () => {
  const [currentContent, setCurrentContent] = useState(1);
  const handleButtonClick = (id: number) => {
    setCurrentContent(id);
  };

  const currentItem = aboutItems.find((item) => item.id === currentContent);

  return (
    <>
      <div className="curved-edge w-full"></div>

      <div className="bg-[var(--mainColor)] flex flex-col md:flex-row items-center md:items-start justify-center gap-12 px-4 py-12 min-h-[400px]">
        <select
          value={currentContent}
          onChange={(e) => handleButtonClick(Number(e.target.value))}
          className="block sm:hidden w-full -mt-4 p-2 rounded border bg-white"
        >
          <option value="1">Who We Are?</option>
          <option value="2">What We Do?</option>
          <option value="3">What We've Done</option>
          <option value="4">Where Are We?</option>
        </select>

        <LayoutGroup>
          <AnimatePresence mode="popLayout">
            {currentItem && (
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
                className={`flex flex-col md:flex-row items-center md:items-start gap-10 ${
                  currentItem.location === "right"
                    ? "md:flex-row-reverse flex-col-reverse"
                    : ""
                }`}
                layout
              >
                <div className="w-full md:max-w-[500px] lg:max-w-[600px]">
                  {!currentItem.map ? (
                    <div className="aspect-[3/2] w-full">
                      <img
                        src={currentItem.image}
                        alt="about img"
                        loading="lazy"
                        className="rounded-xl border-[var(--mainColor)] w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full md:max-w-[500px] md:w-[450px] md:h-[300px] lg:max-w-[600px] lg:w-[600px] lg:h-[400px]">
                      <iframe
                        src={currentItem.map}
                        className="w-full h-full rounded-xl border-[var(--mainColor)]"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  )}
                </div>

                <section className="flex flex-col items-center md:items-start gap-6 text-white max-w-xl">
                  <h2 className="text-3xl relative lg:text-4xl font-bold uppercase leading-tight text-center md:text-left">
                    {currentItem.title.split(" ")[0]} <br />
                    {currentItem.title.split(" ")[1]} <br />
                    {currentItem.title.split(" ")[2]}
                    <span className="hidden md:block absolute top-11 right-26 w-[60px] h-[6px] bg-cyan-400 rounded"></span>
                  </h2>

                  <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-center md:text-justify p-4 sm:p-6 md:p-0">
                    {currentItem.content}
                  </p>

                  {currentItem.map ? (
                    <div className="flex justify-center space-x-4">
                      {socialMediaIcons.map((social) => (
                        <a
                          key={social.name}
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-10 h-10 flex items-center justify-center text-white rounded-full transition-all duration-300 ${social.hoverColor}`}
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <Button
                      variant="secondary"
                      className="px-6 py-1.5 font-bold rounded-[24px] border-cyan-400 hover:text-black"
                    >
                      {currentItem.button}
                    </Button>
                  )}
                </section>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
      <section className="hidden relative w-full bg-[var(--mainColor)] sm:flex flex-col items-center">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 justify-center">
          {aboutItemButtons.map((btn) => (
            <MUIButton
              key={btn.id}
              startIcon={<btn.icon />}
              onClick={() => handleButtonClick(btn.id)}
              sx={{
                px: 8,
                py: 2,
                fontWeight: "bold",
                borderRadius: "8px 8px 0 0",
                bgcolor: currentContent === btn.id ? "white" : "transparent",
                color:
                  currentContent === btn.id ? "navy" : "rgba(255,255,255,0.7)",
                textTransform: "uppercase",
                "&:hover": {
                  bgcolor:
                    currentContent === btn.id
                      ? "white"
                      : "rgba(255,255,255,0.1)",
                },
              }}
              size="large"
            >
              {btn.title}
            </MUIButton>
          ))}
        </div>
      </section>
    </>
  );
};

export default AboutSection;
