// import { useEffect, useState } from "react";

// export default function AnimateOnScroll({ children, className = "" , delay = 0  }) {
 

//  const [show , setShow] = useState(true);
//         const [lastscroll,setLastscroll] = useState(0);


//         useEffect(()=>
//             {
//                 const handelscroll=()=>
//                     {
//                         const currentscroll = window.scrollY;
//                         if (currentscroll > lastscroll && currentscroll > 0)
//                             {
//                                 setShow(true);
//                             }
//                             else
//                             {
//                                 setShow(false);
//                             }

//                             setLastscroll(currentscroll);
//                     }
//                     window.addEventListener("scroll",handelscroll);
//                     return ()=> window.removeEventListener("scroll",handelscroll);
//             },
//         [lastscroll]);

//   return (
//     <div
      
//       className={`${className} md:${show?" push-up":` scale-0 duration-[${delay}ms] `} `}
//     >
//       {children}
//     </div>
//   );
// }

import { useEffect, useRef, useState } from "react";

export default function AnimateOnScroll({
  children,
  className = "",
  minScale = 0.1,
  maxScale = 1,
  step = 0.02,
}) {
  const ref = useRef(null);
  const [scale, setScale] = useState(1);
  const [lastScroll, setLastScroll] = useState(0);
  let scrollTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      // --- Smooth scale on scroll ---
      if (current > lastScroll) {
        setScale((prev) => Math.min(maxScale, prev + step));
      } else {
        setScale((prev) => Math.max(minScale, prev - step));
      }

      setLastScroll(current);

      // --- Detect stop scrolling ---
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      scrollTimeout.current = setTimeout(() => {
        checkIfCentered();
      }, 200);
    };

    const checkIfCentered = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerY = window.innerHeight / 2;

      // If the element’s center is near the viewport center
      if (Math.abs(rect.top + rect.height / 2 - centerY) < 150) {
        setScale(1); // FULL SCALE
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll, minScale, maxScale, step]);


  return (
    <div
      ref={ref}
      style={{
        transform: `scale(${scale})`,
        transition: "transform 0.25s ease-out",
      }}
      className={className}
    >
      {children}
    </div>
  );
}
