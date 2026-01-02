import { Link, NavLink, useNavigate } from "react-router-dom"

import { Theme } from "./Theme"
import {   useContext, useState } from "react"
// import axios from "axios"
// import { AppContext, AppProvider } from "./AppContext"
import { Menu, User, User2Icon, X } from "lucide-react"
import { AppContext } from "./AppContext";
// import logout from'../../assets/icons/out.png'
// import logout2 from'../../assets/icons/out2.png'
import { RiLogoutCircleLine, RiLogoutCircleRLine } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { IoMdLogOut } from "react-icons/io";
import { BiUser } from "react-icons/bi";
import { FaAngleDown, FaUser } from "react-icons/fa6";



export const Nav = ()=>
    {
        const [menu , setMenu] = useState(false);
        const links= [
           
            {path:"/" , name:"Home"},
            {path:"/courses" , name:"Courses"},
            
        ];

        const [profile , setProfile] = useState(false);

         const {user , token , setToken , setUser} = useContext(AppContext);
        const navigate = useNavigate();
        const handleLogout = async (e)=>
            {
                e.preventDefault();
                 const res = await fetch("https://courses-laravel-production.up.railway.app/api/logout",{
                 method:"POST",
                headers:{
                    Authorization:`Bearer ${token}`,
                }
                });
                const out = await res.json();
                console.log(out);
                
                if(res.ok)
                    {
                        setUser(null)
                        setToken(null)
                        localStorage.removeItem("token")
                        navigate('/login')
                    }
            }

     const  logoutmodal = ()=>
    {

        const modaldisplay = document.getElementById("logoutmodal").style.display= "flex" ;
        return  modaldisplay;    
    }  


    

      

        

        return(
            <>
            <div className=" flex z-100 w-full fixed justify-between  text-[15px] px-2 py-3 duration-400 bg-white/90 dark:bg-[#090f1b]/30 ">
                <h1 className="text-2xl pl-10 font-bold navlink duration-400"><span className='text-[#f66630]'>Ed</span>uFree<span className='text-[#f66630]'>.</span></h1>
                 

                 
        
   <button onClick={()=>setMenu((prev)=>!prev)}>
                    {menu?<X className="hover:text-red-500 duration-500 cursor-pointer md:hidden"  />:<Menu  
                    className={`md:hidden  hover:text-indigo-500 duration-500 cursor-pointer`}/>
                    }
                 </button>  

            <div className="flex space-x-10 max-sm:hidden">
                <nav className="space-x-10 mt-2">
                        {links.map((link , key)=><NavLink  className={({isActive})=>isActive?" font-semibold text-[#f66630] border-b-0 bottom-shadow border-[#f66630]/70   duration-400":"hover:text-[#fcb9a1] duration-700 text-gray-600 dark:text-gray-200 font-semibold "} key={key} to={link.path}>{link.name}</NavLink>)}

                       
                </nav>
            </div>

            

            
                {user && user.id ? 
                // outline-1 outline-gray-600 dark:outline-gray-200
                <button onClick={()=>setProfile((prev)=>!prev)} className="  shadow-sm/50 rounded-full p-2 cursor-pointer inset-shadow-sm dark:inset-shadow-indigo-600 dark:shadow-sm shadow-indigo-600/50">
                    <div className="flex space-x-1.5"> 
                        <FaUser className="w-5 h-5 text-gray-600 dark:text-gray-200" />
                        <span>{user.name}</span>
                        <span className="text-sm mt-1.5 text-gray-500"><FaAngleDown/></span>
                    </div>
                </button>
                
               
                :
                <Link to="/register" class="relative overflow-hidden px-6 py-2 rounded-full bg-black text-white group hover:border hover:border-black cursor-pointer hover:text-black">
                                <span class="relative z-10 opacity-100 duration-300 ">
                                    Join Us
                                </span>

                                <span class="absolute inset-0 bg-white -translate-x-full 
                                    group-hover:translate-x-0 transition-transform duration-400"></span>
                            </Link>
                }
            
             
            <div className="max-sm:hidden"> <Theme/></div>

              

                
            </div>


            {/* Mobile Nav */}

            <div className={` fixed inset-0 space-y-6 bg-background/70 backdrop-blur-md flex flex-col items-center justify-center z-40  transition-all duration-400 md:hidden ${menu? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                          
                        <div className="relative top-1 right-1"> <Theme/></div>
                        <div className=" flex flex-col space-y-8">
                         
                        {links.map(items =>
                            (
                            
                                <NavLink className="px-3  text-center hover:bg-indigo-500 rounded-full fill-indigo-500 drop-shadow-lg drop-shadow-indigo-500/50 duration-400" to={items.path} >{items.name}</NavLink>
                            ))}

                           
                            {/* <div className="">
                            <button onClick={logoutmodal}  className="px-3 text-center cursor-pointer hover:bg-red-500 rounded-full fill-indigo-500 duration-400"  >Logout</button>
                          </div> */}
                    
                    
                        </div>
                   </div>

              {/* Serarch Form */}
          {profile&&
          <div className="flex flex-col fixed space-y-5 top-17  dark:outline-0 z-100 right-35 bg-white outline-gray-400 dark:bg-gray-900 p-5 rounded-2xl shadow-md/30">
                    <span className="font-semibold text-lg">Welcome</span>
                    <div className="flex space-x-2 z-90 ">
                    <span className="font-bold text-[#f66630] text-lg">{user.name}</span>
                    </div>
                    <span className="text-gray-400">{user.email}</span>
                     {user&&user.role=='admin'?
                        (<NavLink  className={({isActive})=>isActive?" font-semibold text-[#f66630] duration-400":"hover:text-[#fcb9a1] duration-700 text-gray-600 dark:text-gray-200 font-semibold "} to='/dashboard'>Dashboard</NavLink>):""    
                    } 
                    <hr/>
                    <div>
                        <button onClick={handleLogout} class="relative overflow-hidden px-2 py-1 rounded-full bg-red-700 text-white group hover:border border-red-700 hover:border-red-700 cursor-pointer hover:text-red-700 space-x-1">
                                <span class="relative z-10 opacity-100 duration-300 px-1 flex">
                                    logout
                                    <RiLogoutCircleRLine className={"w-5 h-5 mt-0.5 mx-2 "}/>
                                </span>

                                <span class="absolute inset-0 rounded-full  bg-white -translate-x-full 
                                    group-hover:translate-x-0 transition-transform duration-400"></span>
                            </button>
                    </div>
                    
                </div>
                }  
           
            </>
            
        )
    }




