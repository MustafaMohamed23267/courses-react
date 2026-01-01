import { Nav } from "./components/Nav"
import { Calendar, Group, Star, Timer,  Youtube } from "lucide-react";
import { Link } from "react-router-dom";

// import learn from '../assets/learn.jpg';
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./components/AppContext";
import { Loading } from "./components/Loading";
import { BiCategory } from "react-icons/bi";

export default function Courses()

// export const Courses = ()=>
    {
        const {user} = useContext(AppContext);
         const [data , setData]= useState([]);
         const token = localStorage.getItem("token");
         const[loading , setLoading] = useState(true);
        useEffect(()=>
            {
                const fetchCourses = async()=>{

                    if (token ) {
                        const res = await fetch("http://127.0.0.1:8000/api/courses",{
                        method:"GET",
                        headers:{
                            Accept:"application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                        
                    })
                     const response  = await res.json();
                    setData(response.data || []);
                    setLoading(false);
                    }
                    else{
                        const res = await fetch("http://127.0.0.1:8000/api/allcourses",{
                          method:"GET",
                          headers:{
                              Accept:"application/json",
                          }
                          
                      })
                      const response  = await res.json();
                      setData(response);
                      setLoading(false);
                    }
                    
                    
                   
                }
                
                fetchCourses();
            },[token]);

            const [search, setSearch] = useState("");
            const filteredcourses = data.filter(course =>
            course.title.toLowerCase().includes(search.toLowerCase()) 
);

        return(
            <>
            {loading?
            <Loading/>
                    :   
             <main>
            <Nav/>
            <br/>
            <div className="flex mt-30 px-10 md:space-x-4 w-full justify-center max-md:flex-col max-md:space-y-4  space-x-4 max-md:items-center z-10"> 
           
                <input 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)} 
                 type="search" name="searchname" 
                 className="  w-[60%] max-md:w-full rounded-md bg-white outline-gray-400 dark:bg-white/5 px-3 py-3  outline-1 outline-offset-1 dark:outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" placeholder="search Course..."
                />
                
            

            {user&&user.role!='student'?
            <Link to='/addcourse' className="relative overflow-hidden px-6 py-3 rounded-full bg-[#f66630] text-white group hover:border hover:border-[#f66630] cursor-pointer hover:text-[#f66630]">

                                <span class="relative z-10 opacity-100 duration-300 ">
                                    Add Course
                                </span>

                                <span class="absolute inset-0 bg-white -translate-x-full 
                                    group-hover:translate-x-0 transition-transform duration-400"></span>
                            </Link>
            :""}
            </div>

            

            <div className=" grid grid-cols-1 max-sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-20 pb-10 mt-10 z-50">

            {
             filteredcourses.map((data)=>
                <div className="flex flex-col relative duration-700 outline-1 -outline-offset-1 outline-gray-300 dark:outline-white/10 dark:bg-white/5  pb-10  overflow-hidden  rounded-xl ">
                <Link to={`/courses/${data.id}`}  class=" space-y-5  ">
                    <div className="w-full h-[250px]">
                      <img  src={token?data.image_url: `http://127.0.0.1:8000/storage/${data.image_url}`} class="duration-500  hover:scale-[1.05] w-full h-full z-50 "/>
                    </div>
                    <div className="absolute top-59 right-2 text-white text-sm flex space-x-1 justify-baseline bg-[#1c1e53] py-0.5 px-5 rounded-full">
                        <span className="text-[12px] mt-[2.5px]"> {data.rating}</span>
                        <Star className="text-amber-400 w-3 fill-amber-400"/>
                        
                       
                    </div>
                    <div className="pl-5  z-100 h-15 pr-2">
                        <span className="font-extrabold text-lg transition duration-400"> {data.title}</span>
                    </div>

                    <div className=" text-center text-sm flex justify-center space-x-1 transition duration-400">
                        <sapn>Created by:</sapn>  
                        <span className="text-indigo-500 font-semibold">{ data.instructor.name? data.instructor.name :"not found " }</span>
                    </div>

                    <div className="flex space-x-6 justify-center">
                        <div className="flex space-x-1  text-sm transition duration-400  rounded-full"> 
                        <Timer width="15px" height="15px"/><span> {data.duration} hours</span>
                        </div>  

                        <div className="flex space-x-2 text-sm  rounded-full  transition duration-400 "> 
                        <Youtube width="18px" height="18px" className=""/><p className="">{data.videos} videos</p>   
                        </div>

                        <div className="flex space-x-2 text-sm  rounded-full  transition duration-400 "> 
                        <BiCategory className="text-xl"/><p className="">{data.category.name}</p>   
                        </div>
                        
                    </div>
                    
                </Link>
                </div>   
            )
            
            }
   
          
            </div>
            </main>
        }
            </>
        )
    }