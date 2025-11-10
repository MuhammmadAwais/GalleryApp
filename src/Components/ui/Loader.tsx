import React from "react";
import classNames from "classnames";

interface LoaderProps {
  time: number;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ time, className }) => {
  const outerClass = classNames(
    "relative",
    "overflow-hidden",
    "mb-2.5",
    "rounded",
    "bg-gray-200",
    className
  );
  const innerClass = classNames(
    "shimmer",
    "absolute",
    "inset-0",
    "-translate-x-full",
    "bg-gradient-to-r",
    "from-gray-200",
    "via-white",
    "to-gray-200",
    className
  );

  const boxes = Array(time)
    .fill(0)
    .map((_, i) => (
      <div className={outerClass} key={i}>
        <div className={innerClass} />
      </div>
    ));

  return <>{boxes}</>;
};

export default Loader;
