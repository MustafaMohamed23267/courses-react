
// export const Loading =()=>{
//     return(
//     // <div className="flex flex-col w-full h-screen items-center justify-center space-x-2">
//     //         <div className="">
//     //             <div className="w-10 h-10 bg-gray-200 rounded-full animate-spin overflow-hidden">
//     //                     <div className=" w-5 h-5 bg-indigo-300 rounded-t-full "></div>
//     //             </div>
//     //             <span>Loading</span>
//     //         </div>
                        
//     // </div>

//     //  <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white dark:bg-black">
//     //     <span className="text-xl px-2 text-indigo-500 animate-bounce [animation-delay:-0.3s] ">Loading</span>
//     //   <div className="flex space-x-2">
//     //     <span className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
//     //     <span className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
//     //     <span className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce"></span>
//     //   </div>
//     // </div>

//      <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white dark:bg-black">
      
//       {/* Spinner */}
//       <div className="relative w-20 h-20">
//         <div className="absolute inset-0 rounded-full border-4 border-indigo-200"></div>
//         <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
//       </div>

//       {/* Text */}
//       <p className="mt-6 text-lg font-semibold dark:text-gray-300 animate-pulse text-indigo-500">
//         Loading, please wait...
//       </p>

//     </div>
//     )
    
// }


import { useEffect, useState } from "react";

export const Loading =()=>{
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let value = 0;

    const interval = setInterval(() => {
      value += 1;
      setProgress(value);

      if (value >= 100) {
        clearInterval(interval);
      }
    }, 20); // السرعة

    return () => clearInterval(interval);
  }, []);

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white dark:bg-black">

      {/* Circle */}
      <svg width="220" height="220" className="mb-6">
        {/* Background circle */}
        <circle
          cx="110"
          cy="110"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="12"
          fill="none"
        />

        {/* Progress circle */}
        <circle
          cx="110"
          cy="110"
          r={radius}
          stroke="#6366f1"
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-100"
          transform="rotate(-90 110 110)"
        />
      </svg>

      {/* Percentage text */}
      <span className="absolute text-3xl font-bold  text-indigo-500">
        {progress}%
      </span>

      {/* Subtitle */}
      <div className="mt-6 text-gray-600 dark:text-gray-400 flex space-x-2 animate-pulse">
            <span className="text-xl px-2 text-indigo-500 animate-bounce [animation-delay:-0.3s] ">Loading</span>
            <div className="flex space-x-2">
            <span className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce"></span>
            </div>
      </div>

    </div>
  );
}
