import { Typography } from "@mui/material";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { CountUpItem } from "../types/types";

interface CountUpProps {
  number: number;
  duration?: number;
  delay?: number;
}

const CountUp: React.FC<CountUpProps> = ({
  number,
  duration = 2,
  delay = 0,
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      let start = 0;
      const fps = 60;
      const increment = number / (duration * fps);

      const interval = setInterval(() => {
        start += increment;
        if (start >= number) {
          start = number;
          clearInterval(interval);
        }
        setCount(Math.floor(start));
      }, 1000 / fps);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isInView, number, duration, delay]);

  return (
    <motion.div ref={ref}>
      <Typography variant="h2" component="span">
        {count}
      </Typography>
    </motion.div>
  );
};

export const CountUpCard: React.FC<CountUpItem> = ({
  label,
  number,
  delay = 0,
  suffix = "",
  className = "",
}) => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <section
        className={`flex text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--mainColor)] ${className} mb-2`}
      >
        <CountUp number={number} delay={delay} />
        <p className="text-cyan-400">{suffix}</p>
      </section>
      <span className="w-[60%] h-[3px] bg-cyan-400"></span>
      <p className="text-sm md:text-xl uppercase text-center mt-2 text-gray-500">
        {label}
      </p>
    </div>
  );
};

export default CountUpCard;
