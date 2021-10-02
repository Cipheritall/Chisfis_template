import { StarIcon } from "@heroicons/react/solid";
import React, { FC } from "react";

export interface StartRatingProps {
  className?: string;
  point?: number;
  reviewCount?: number;
}

const StartRating: FC<StartRatingProps> = ({
  className = "",
  point = 4.5,
  reviewCount = 112,
}) => {
  return (
    <div
      className={`nc-StartRating flex items-center space-x-1 text-sm  ${className}`}
      data-nc-id="StartRating"
    >
      <StarIcon className="w-5 h-5 text-red-500" />
      <span className="font-medium ">{point}</span>
      <span className="text-neutral-500 dark:text-neutral-400">
        ({reviewCount})
      </span>
    </div>
  );
};

export default StartRating;
