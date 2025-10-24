import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { layer1, layer2, layer3 } from "../../../common/assets/images";

export default function StackedImages() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["-90px", "0px"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-140px", "35px"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["-190px", "70px"]);

  return (
    <div className="relative flex justify-center items-center w-full">
      <section className="relative w-4xl h-[500px]" ref={containerRef}>
        <motion.img
          src={layer3}
          alt="layer3"
          style={{ y: y3 }}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain z-40"
        />
        <motion.img
          src={layer2}
          alt="layer2"
          style={{ y: y2 }}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain z-30"
        />
        <motion.img
          src={layer1}
          alt="layer1"
          style={{ y: y1 }}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain z-20"
        />
      </section>
    </div>
  );
}
