import { Star } from "lucide-react";
import { useState } from "react";

export default function InputRating({
  value = 0,
  max = 5,
  size = 22,
  onChange,
}) {
  const [hoverValue, setHoverValue] = useState(null);

  const currentValue = hoverValue ?? value;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, index) => {
        const fillPercentage =
          Math.min(Math.max(currentValue - index, 0), 1) * 100;

        return (
          <div
            key={index}
            className="relative cursor-pointer"
            style={{ width: size, height: size }}
            onMouseEnter={() => setHoverValue(index + 1)}
            onMouseLeave={() => setHoverValue(null)}
            onClick={() => onChange(index + 1)}
          >
            {/* empty star */}
            <Star
              style={{ width: size, height: size }}
              className="text-gray-400"
            />

            {/* filled part */}
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
            >
              <Star
                style={{ width: size, height: size }}
                className="text-yellow-400 fill-yellow-400"
              />
            </div>
          </div>
        );
      })}

      {/* rating number */}
      <span className="ml-2 text-sm font-semibold text-yellow-400">
        {currentValue.toFixed(1)}
      </span>
    </div>
  );
}
