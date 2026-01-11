import home from '../assets/home555.png';
import employee from '../assets/employee.png';
import world from '../assets/world.png';
import me from '../assets/m2.jpg';
//import AnimateOnScroll from './components/Animateonscroll';

import { Nav } from './components/Nav';
import { Lightbulb, Play, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from './components/Footer';
import { useEffect, useState } from 'react';
export default function Home()
//  export const Home =()=>
{

 const[category , setCategory] = useState([]);

 useEffect(()=>{
    const getcategory  = async()=>{
    const res = await fetch("https://courses-laravel-production.up.railway.app/api/category",{
        method:"get",
        headers:{
            accept:"application/json"
        }
    });

    const data = await res.json();
    setCategory(data.category);
    //setCourses(data.category.courses);

 }
 getcategory();
 },[]);
 
        

        return(
            <>
            
            <main> 
                <Nav/>
                {/* first element mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm*/}
                <section className=" flex max-sm:flex-col mask-b-from-65% mask-b-to-100% bg-[#fddad3] dark:bg-gray-900  "> 
                {/* Left Section */}
                <div className="w-[50%] max-sm:w-full mt-20 md:pl-25 pl-5 pr-10 ">
                    <div className='  -rotate-12 '>
                      <span className='px-2 py-0.5 text-sm rounded-full bg-[#f66630] text-white '> eLearning Platform</span>
                    </div>
                    <br/>
                    <div className='flex flex-col pt-10 space-y-6'>
                        <h2 className='text-5xl font-bold'>Smart Learning <br/>
                        Deeper & More<br/>
                        <span className='text-[#f66630]'>-Amazing</span>
                        </h2>

                        <p>
                            Future-proof your skills with Personal Plan. Get access to a variety of fresh content from real-world experts. From critical skills to technical topics, Udemy supports your professional development.
                        </p>

                        <div className='flex space-x-4'>
                            <button class="relative overflow-hidden px-6 py-3 rounded-full bg-teal-500 text-white group hover:border  hover:border-teal-500 cursor-pointer hover:text-teal-500">

                                <span class="relative z-10 opacity-100 duration-300 ">
                                    Start Free Trial &#8599;
                                </span>

                                <span class="absolute inset-0 bg-white -translate-x-full 
                                    group-hover:translate-x-0 transition-transform duration-400"></span>
                            </button>
                            <div className='flex space-x-2'>
                                <Link to='/courses' class="relative overflow-hidden px-3 py-3 rounded-full bg-[#f66630] text-white group hover:border hover:border-[#f66630] hover:text-[#f66630] cursor-pointer ">

                                <span className=' relative z-10 opacity-100 duration-300'><Play /></span>

                                <span class="absolute inset-0 bg-white -translate-x-full 
                                    group-hover:translate-x-0 transition-transform duration-400"></span>
                            </Link>
                            <span class="py-3 font-bold">
                                    Courses
                            </span>
                            </div>
                            

                        </div>
                    </div>
                </div>

                {/* Right Section */}
                
                <div className="w-[50%] max-sm:w-full max-sm:flex">
                    <img src={home} className='md:w-fit w-full' />
                </div>

               
                </section>
                {/* end of first element mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm*/}


                 {/* second  element About us mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm*/}
                <section className='appear flex flex-col items-center pb-10 '>
                    
                        <div className={`  duration-700 flex flex-col flex-wrap items-center w-4xl max-sm:w-xl max-sm:text-md`}>
                            <div className=' -rotate-12  '>
                            <span className='px-2 py-0.5 text-sm rounded-full bg-teal-500 text-white '> About Us</span>
                            </div>
                            <br/>
                            <p className='text-2xl font-semibold max-sm:px-15 max-sm:text-sm '>
                                We are passionate about emproving learners <span className='text-gray-600 dark:text-gray-400'>Worldwide with high-quality, accessible & engaging education. Our mission offering a divers range of courses</span>
                            </p>

                            <div className='flex space-x-3 py-6 max-sm:px-15 max-sm:text-sm'>
                                <div className='flex space-x-2.5'>
                                    <span className='text-5xl font-bold max-sm:text-xl'>56K</span>
                                    <span className='text-gray-600 dark:text-gray-400'>Students Enrolled in EduFree Courses</span>
                                </div>

                                <div className='flex space-x-2.5'>
                                    <span className='text-5xl font-bold max-sm:text-xl'>170+</span>
                                    <span className='text-gray-600 dark:text-gray-400 '>Experienced Teachers Services</span>
                                </div>

                                <div className='flex space-x-2.5'>
                                    <span className='text-5xl font-bold max-sm:text-xl'>25+</span>
                                    <span className='text-gray-600 dark:text-gray-400'>Years of eLearning Education Experience</span>
                                </div>

                            </div>
                        <div className='w-full h-1 bg-gray-900 my-5
                        mask-b-from-40% mask-b-to-70%
                        mask-t-from-40% mask-t-to-70% 
                        mask-r-from-45% mask-r-to-85%  
                        mask-l-from-50% mask-l-to-90%
                        '></div>
                        </div>


                    
                    
                    
                    
                </section>
                {/*end of second About us  element mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm*/}



                {/*   element Category mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm*/}
                <section className='appear py-10 mask-t-from-90% mask-t-to-100%  mask-b-from-85% mask-b-to-100% bg-[#fddad3] dark:bg-gray-900'>
                    <div className=' flex justify-center py-5  -rotate-12 '>
                        <span className='px-2 py-0.5 text-sm rounded-full bg-[#f66630]  text-white '> Categories</span>
                    </div> 
                    
                    <div className='text-center'>
                        <p className='font-bold text-5xl'>Choice Favourite Course <br/>
                        from top category</p>
                    </div>
                    <div className='flex flex-wrap justify-center gap-8 p-20'>
                        {
                            
                                category.slice(0,5).map((cat , key)=>
                                <button key={key} className='px-10 py-5 rounded-xl bg-white/45 dark:bg-white/5 text-center space-y-12 hover:scale-[1.1] duration-500'>
                                    <div className=' space-y-3'>
                                        <p className='font-bold text-xl'>{cat.name}</p>
                                        <p className='text-gray-500 dark:text-gray-200'>this category belongs to {cat.slug} field</p>
                                    </div>
                                    

                                    <div className='flex items-start '>
                                        <p className='flex  px-4 py-0.5 bg-[#f66630] rounded-full text-white'><div className='bg-white mt-2 mr-1 w-2 h-2 rounded-full'></div>{cat.courses.length}+ courses</p>
                                     </div>
                                </button>
                            )
                                
                            
                        }
                    </div>
                

                </section>
                {/* end fo  section Category mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm*/}



                {/* third  element testimonial */}
                <section  className='flex flex-col items-center py-8 appear' >
                    <div className=' flex flex-col items-center w-full max-sm:px-5'>
                    
                        <div className='  -rotate-12 '>
                        <span className='px-2 py-0.5 text-sm rounded-full bg-[#f66630]  text-white '> Testimonial</span>
                        </div> 
                        

                            <div className='flex flex-col pt-10  pr-5 text-center relative'>
                            <h2 className='text-5xl font-bold '>See why We're rated #1 in <br/> 
                            Online 
                            <span className='text-[#f66630]'>Platform tech</span>
                            </h2>
                            

                            {/*  */}
                            <div className='bg-teal-600 h-15 w-15 rounded-full absolute top-37 max-sm:top-50 -right-2 z-0'></div>
                            <div className='relative space-y-2 top-10  rounded-4xl shadow-md/20  w-[900px] h-[450px]  bg-white dark:bg-gray-900/30 backdrop-blur-sm z-5 max-sm:w-[450px] max-sm:h-[470px] max-sm:ml-5'>
                            
                                <img src={world} className='absolute w-full h-full z-0 opacity-30 dark:opacity-5' />
                                <div className='absolute h-full px-10 space-y-6 top-30'>
                                    <div className='justify-center flex space-x-1.5  z-10  '>
                                    <span className='bg-foreground px-2  rounded-sm text-background font-bold'>C</span>
                                    <span className='font-bold text-xl' >CodeLine</span>
                                    </div>
                                    <p className='text-gray-600 dark:text-gray-300 text-xl font-semibold z-10'>
                                        Our dynamic educatinal platform offers you the tools and resources to propel yourself towards a brighter future. With expert guidance & a supportive community 
                                    </p>

                                    <div className='space-y-2 flex flex-col items-center mt-20'>
                                        <img src={me} className='w-12 h-12 rounded-full' />
                                        <div className='flex text-[10px] space-x-1.5'>
                                             <span className='font-bold'>Mustafa Mohamed</span>
                                            <div className='w-1 h-1 rounded-full bg-black mt-1.5 dark:bg-white'></div>
                                            <span>Website Creator</span>
                                        </div>
                                       
                                    </div>
                                </div>
                            
                           
                            </div>
                            {/*  */}

                            
                        </div>
                    </div>
                        
                     <br/>
                </section>
                {/* end of third  element testimonial mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm*/}

                

                {/* 4th  element why us mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm*/}
                <section  className='appear flex max-sm:flex-col-reverse max-sm:px-5  pb-10  mask-b-from-80% mask-b-to-100%  mask-t-from-90% mask-t-to-100% bg-[#fddad3] dark:mask-b-from-65% dark:bg-gray-900'>
                    {/* left-section */}
                    <div className='w-[45%] max-sm:w-full' >
                        <img src={employee} className='w-fit h-screen mask-b-from-90% mask-b-to-100% ' />

                    </div>

                    {/* right-section */}
                    <div className='w-[55%] max-sm:w-full'>
                        <div className='  -rotate-12 '>
                        <span className='px-2 py-0.5 text-sm rounded-full bg-[#f66630] text-white '> Why Us</span>
                        </div>
                        <br/><br/>

                            <div className='flex flex-col pt-10 space-y-6 pr-5'>
                            <h2 className='text-5xl font-bold'>Growth Skill With <span className='text-[#f66630]'>Edu</span>Free <br/>
                            Academy & Accelerate to<br/> 
                            Your Better Future
                            </h2>
                            <div className='space-y-2'>
                            <p>
                                Embrace the transformative journey of learning with edufree knowledge becomes a catalyst for progress
                            </p>

                            <p>
                                Our dynamic educatinal platform offers you the tools and resources to propel yourself towards a brighter future. With expert guidance & a supportive community 
                            </p>
                            </div>

                            <div className='flex space-x-4'>
                                <Link to='/courses' class="relative overflow-hidden px-6 py-3 rounded-full bg-teal-500 text-white group hover:border hover:border-teal-500 cursor-pointer hover:text-teal-500">

                                    <span class="relative z-10 opacity-100 duration-300 ">
                                        Browse Courses &#8599;
                                    </span>

                                    <span class="absolute inset-0 bg-white -translate-x-full 
                                        group-hover:translate-x-0 transition-transform duration-400"></span>
                                </Link>
                                
                                

                            </div>
                        </div>

                    </div>
                </section>
                {/* end of 4th  element why us mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm*/}



        
                {/* 5th  element mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm*/}
                <section  className='appear flex flex-col items-center py-4' >
                <div className=' flex flex-col items-center w-[65%]'>

                        <div className='flex flex-col pt-10 space-y-6 pr-5 text-center'>
                        <h2 className='text-5xl font-bold '>What You Looking for?
                        </h2>

                        <div className='space-y-2 flex flex-col items-center rounded-md'>

                        <p className='text-gray-600 dark:text-gray-400 text-xl font-semibold z-10 w-xl'>
                            Our dynamic educatinal platform offers you the tools and resources to propel yourself towards a brighter future. 
                        </p>
                        </div>

                        <div className='md:flex max-sm:grid max-sm:grid-cols-1 max-sm:space-y-6 md:space-x-6 py-10 px-20'>

                            
                            <div className='flex flex-col  px-5 py-5 w-[450px] rounded-lg bg-gray-200 text-gray-900 space-y-5' >
                                 <User className='w-15 h-15 text-[#f66630]'/>
                                <h2 className='font-bold text-left text-2xl'>Do You want Teach Here</h2>
                               
                                <p className='text-sm text-left'>Our dynamic educational platform offers you the tools
                                    <br/> supportive community</p>

                                    <Link to='/register' class="relative overflow-hidden  py-2 rounded-full bg-gray-700 text-white group hover:border hover:border-gray-700 cursor-pointer hover:text-gray-700 w-30 ">

                                <span class="relative z-10 opacity-100 duration-300 ">
                                    Get Started 
                                </span>

                                <span class="absolute inset-0 bg-white -translate-x-full 
                                    group-hover:translate-x-0 transition-transform duration-400"></span>
                               </Link>
                               
                            </div>

                            <div className='flex flex-col px-5 py-5 w-[450px] rounded-md bg-teal-500 text-white space-y-5' >
                                <Lightbulb className='w-15 h-15 text-white'/>
                                <h2 className='font-bold text-2xl text-left'>Do You want Learn Here</h2>
                                
                                <p className='text-sm text-left'>Our dynamic educational platform offers you the tools
                                    <br/> supportive community</p>

                                    <Link to='/register' class="relative overflow-hidden  py-2 rounded-full bg-[#f66630] text-white group hover:border hover:border-[#f66630] cursor-pointer hover:text-[#f66630] w-30 ">

                                <span class="relative z-10 opacity-100 duration-300 ">
                                    Enroll Now 
                                </span>

                                <span class="absolute inset-0 bg-white -translate-x-full 
                                    group-hover:translate-x-0 transition-transform duration-400"></span>
                               </Link>
                               
                            </div>


                        </div>

                        
                    </div>
                </div>
                     

                </section>
                {/* end of 5th  element mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm*/}

                <Footer />
            </main>
            
           
            </>
        )
    }