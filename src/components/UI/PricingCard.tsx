import type React from "react";
import AddIcon from "@mui/icons-material/Add";
import type { PricingCardProps } from "../types/types";
import { Button } from "../common";

const PricingCard: React.FC<PricingCardProps> = ({
  planName,
  price,
  duration,
  popular = false,
  className = "",
}) => {
  return (
    <div
      className={`flex relative border cursor-default border-gray-50 flex-col items-center justify-between bg-white rounded-2xl shadow-2xl drop-shadow-xl w-full max-w-sm min-h-[480px] p-8 hover:scale-[1.03] transition-transform duration-300 ${className}`}
    >
      <p
        className={`text-lg px-8 py-2 text-[var(--mainColor)] shadow-lg font-bold rounded-full absolute -top-5 ${
          popular ? "bg-cyan-400" : "bg-white "
        }`}
      >
        {planName}
      </p>

      <div className="flex flex-col items-center gap-2 mt-10">
        <p className="xl:text-7xl text-5xl text-[var(--mainColor)] text-center">
          ${price}
        </p>
        <p className="text-cyan-500 text-center">{duration}</p>
      </div>

      <p className="text-center text-gray-500 leading-relaxed">
        Lorem ipsum dolor sit, adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua.
      </p>

      <Button
        variant={popular ? "popular" : "primary"}
        size="lg"
        iconLeft={<AddIcon />}
      >
        Order Now
      </Button>
    </div>
  );
};

export default PricingCard;
