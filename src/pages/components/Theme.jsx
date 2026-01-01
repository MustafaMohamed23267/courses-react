import {  CloudSun, Moon, Stars, Sun } from "lucide-react";
import { useEffect, useState } from "react"

export const Theme =()=>
    {
        const [isDark , setIsDark]=useState(false);

        const themetoggle =()=>{
        if(isDark)
            {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("theme","light");
                setIsDark(false);
            }
            else
                {
                    document.documentElement.classList.add("dark");
                    localStorage.setItem("theme","dark");
                    setIsDark(true);
                }
            }
            useEffect(()=>
              {
                const StoredTheme = localStorage.getItem("theme");
                  if(StoredTheme === "dark")
                    {
                       setIsDark(true);
                       document.documentElement.classList.add("dark");
                    }
                    else
                    {
                        document.documentElement.classList.remove("dark");
                        localStorage.setItem("theme","light");
                    }

               },[])
        

           return(
            <button className={`cursor-pointer animate-bounce ${isDark?"pr-6 pl-1 bg-blue-300 ":"pl-6 pr-1 bg-yellow-200"} hover:scale-[1.1] duration-700 py-1 transition-colors rounded-full focus:outline-hidden `} onClick={themetoggle}>
                {isDark?
                <div  className="flex space-x-2 duration-500">
                    <Moon  className="h-6 w-6  bg-indigo-500 text-white rounded-full  "/> 
                    <Stars/>
                </div>
                :<div className="flex space-x-2 duration-500">
                    <CloudSun className="text-white"/>
                    <Sun className="h-6 w-6  text-yellow-400 -right  duration-500 bg-blue-400 rounded-full" />
                </div>
                
                }
            </button>
           )

    }