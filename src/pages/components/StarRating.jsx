import { Star } from "lucide-react";

export default function StarRating({ rating = 0, max = 5, size = 18 }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1;
        const fillPercentage = Math.min(
          Math.max(rating - index, 0),
          1
        ) * 100;

        return (
          <div
            key={index}
            className="relative"
            style={{ width: size, height: size }}
          >
            {/* empty star */}
            <Star
              style={{ width: size, height: size }}
              className="text-gray-300"
            />

            {/* filled part */}
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
            >
              <Star
                style={{ width: size, height: size }}
                className="text-amber-500 fill-amber-500"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// import { Star } from "lucide-react";
// import { useState } from "react";

// export default function StarRating({
//   value = 0,
//   max = 5,
//   size = 20,
//   onChange,
// }) {
//   const [hoverValue, setHoverValue] = useState(null);

//   return (
//     <div className="flex gap-1">
//       {Array.from({ length: max }).map((_, index) => {
//         const starIndex = index + 1;

//         const currentValue =
//           hoverValue !== null ? hoverValue : value;

//         const fillPercentage =
//           Math.min(Math.max(currentValue - index, 0), 1) * 100;

//         return (
//           <div
//             key={index}
//             className="relative cursor-pointer"
//             style={{ width: size, height: size }}
//             onMouseEnter={() => setHoverValue(starIndex)}
//             onMouseLeave={() => setHoverValue(null)}
//             onClick={() => onChange?.(starIndex)}
//           >
//             {/* النجمة الفاضية */}
//             <Star
//               style={{ width: size, height: size }}
//               className="text-gray-300"
//             />

//             {/* الجزء المليان */}
//             <div
//               className="absolute top-0 left-0 overflow-hidden"
//               style={{ width: `${fillPercentage}%` }}
//             >
//               <Star
//                 style={{ width: size, height: size }}
//                 className="text-amber-500 fill-amber-500"
//               />
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

