import React from "react";
import type { LoadingProps } from "./loading.types";
import clsx from "clsx";

const sizeMap = {
  sm: "h-6 w-6 border-2",
  md: "h-10 w-10 border-4",
  lg: "h-16 w-16 border-4",
};

const Loading: React.FC<LoadingProps> = ({
  size = "md",
  text,
  fullScreen = false,
  className,
}) => {
  const spinnerSize = sizeMap[size];

  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center ",
        fullScreen ? "fixed inset-0" : "py-10",
        className
      )}
      style={{ backgroundColor: "var(--mainColor)" }}
    >
      <div
        className={`spinner rounded-full animate-spin border-t-transparent border-white ${spinnerSize}`}
      />
      {text && (
        <p className="mt-4 text-white text-lg font-medium text-center">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loading;
