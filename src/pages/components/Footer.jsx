import { Facebook, Github, LocateIcon, MapPin, Phone, Twitter, Youtube } from "lucide-react"
import { Link } from "react-router-dom"

export const Footer = ()=>{


    return(
        <>
        <div className=" bg-[#fddad3]  dark:bg-gray-900 sticky top-0 mask-t-from-90% mask-t-to-100% z-0 ">
            <div className="flex pl-20 pr-10 py-10 space-x-25 max-sm:pl-2 max-sm:pr-2 max-sm:py-w max-sm:space-x-5">

                <div className="w-90 space-y-6">
                <h1 className="text-4xl max-sm:text-xl font-bold navlink duration-400"><span className='text-[#f66630]'>Ed</span>uFree<span className='text-[#f66630] '>.</span></h1>
                <p className="max-sm:text-sm">we're always in search for talented and motivated people. Don't be shy introduce yourself Subscribe to our newsletter</p>
                <div className="space-y-2">
                    <p className="font-bold">Social Media</p>
                   <div className="flex space-x-4 text-gray-900">
                    <Facebook className="rounded-full max-sm:w-5 max-sm:h-5 max-sm:p-0.5 hover:text-[#f66630] cursor-pointer duration-500 w-10 h-10 p-2 bg-white "/>
                    <Youtube className="rounded-full max-sm:w-5 max-sm:h-5 max-sm:p-0.5 w-10 h-10 p-2 bg-white hover:text-[#f66630] cursor-pointer duration-500"/>
                    <Github className="rounded-full max-sm:w-5 max-sm:h-5 max-sm:p-0.5 w-10 h-10 p-2 bg-white hover:text-[#f66630] cursor-pointer duration-500"/>
                    <Twitter className="rounded-full max-sm:w-5 max-sm:h-5 max-sm:p-0.5 w-10 h-10 p-2 bg-white hover:text-[#f66630] cursor-pointer duration-500"/>
                   </div>
                </div>
                
            </div>

            <div className="space-y-6">
                <h2 className="font-bold max-sm:text-sm">Company Info</h2>
                <div className="flex flex-col max-sm:text-sm space-y-2">
                    <Link>Home</Link>
                <Link>Courses</Link>
                <Link>Reegister</Link>
                <Link>Login</Link>
                </div>
                
            </div>


             <div className="space-y-6">
                <h2 className="font-bold max-sm:text-sm">Top Categories</h2>
                <div className="flex flex-col max-sm:text-sm space-y-2">
                    <Link>Development</Link>
                    <Link>Design</Link>
                    <Link>Marketing</Link>
                    <Link>it & software</Link>
                </div>
                
            </div>



            <div className="space-y-6    ">
                <h2 className="font-bold max-sm:text-sm">Location</h2>
                <p >Join us on journey of discovery as we <br/> explore the latest trend</p>
                <div className="flex flex-col space-y-2 ">
                    <div className="flex space-x-1" >
                        <span><MapPin className="rounded-full text-[#f66630] max-sm:w-4 max-sm:h-4 max-sm:p-0.5  w-7 h-7 p-1 bg-white"/></span>
                        <span className="max-sm:text-sm">banha ,Qalyubia ,Egypt</span>
                        
                    </div>

                    <div  className="flex space-x-1">
                        <span><Phone className="rounded-full text-[#f66630] max-sm:w-4 max-sm:h-4 w-7 h-7 p-1 max-sm:p-0.5 bg-white"/></span>
                        <span className="max-sm:text-sm">+201110792037</span>
                    </div>
                </div>
                
            </div>
            </div>
            

            <div className="text-center py-10">
                <p>&#169; 2025 the Themtags. All rights reserved</p>
            </div>
            
            
        </div>

        
        </>
    )
}