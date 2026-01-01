import { Nav } from "./components/Nav"
import {  Group, Star, StarIcon, Timer, Youtube } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import {  Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "./components/AppContext";
// import { Footer } from "./components/Footer";
// import learn from '../assets/learn.jpg';
import { Loading } from "./components/Loading";
import StarRating from "./components/StarRating";
import InputRating from "./components/InputRating";

export default function CourseInfo(){
// export const CourseInfo = ()=>{
    const {user} = useContext(AppContext);
    const [ShowCourse , setShowCourse] = useState({});
    const {id} = useParams();
    const Navigate = useNavigate();
    const[loading , setLoading] = useState(true);
    const token = localStorage.getItem("token");
    const [rating, setRating] = useState(0);
    const [message , setMessage]=useState("");
    const[messagecolor , setMessagecolor] = useState("");
    const[enrolled , setEnrolled] = useState(false);
    
   

     useEffect(() => {
    const checkEnrollment = async () => {
      const res = await fetch(`http://127.0.0.1:8000/api/book/check/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setEnrolled(data.enrolled);
    };

    checkEnrollment();
  }, [id , token]);

    const handleBooking = async (e)=>
        {
            e.preventDefault();
              if (!ShowCourse?.id) return;
            try {
                
            const data = new FormData();
            data.append("course_id",ShowCourse.id);
            const book = await fetch(`http://127.0.0.1:8000/api/book`,{
                method:"POST",
                body:data,
                headers:{
                    Accept:'application/json',
                    Authorization:`Bearer ${token}`
                }

            });
            const response = await book.json();
            setMessagecolor("bg-green-400");
            console.log(response);
            setMessagecolor("text-green-400");
            setMessage("Course enrolled successfully");
            setEnrolled(true);
            setTimeout(() => {
                setMessage("");
            }, 2000);
            } catch (error) {
               console.log(error); 
               setMessagecolor("text-red-500");
                setMessage("Error on enrol course");
            setTimeout(() => {
                setMessage("");
            }, 2000);
            }
            
            
        }

    useEffect(()=>{
    const fetchCourse = async()=>{
                if (token) {
                    const res = await fetch(`http://127.0.0.1:8000/api/courses/${id}`,{
                        method:"GET",
                        headers:{
                            Accept:"application/json",
                            Authorization: `Bearer ${token}`
                        }
                        
                    })
                    const result = await res.json();
                    setShowCourse(result.data);
                    setLoading(false);
                }
                else{
                    const res = await fetch(`http://127.0.0.1:8000/api/allcourses/${id}`,{
                        method:"GET",
                        headers:{
                            Accept:"application/json",
                        }
                        
                    })
                    const result = await res.json();
                    setShowCourse(result  );
                    setLoading(false);
                }
                }
                    
                
                fetchCourse();
                },[id , token]);

const HandelDelete = async (e)=>{
    e.preventDefault();
    await fetch(`http://127.0.0.1:8000/api/courses/${id}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });

    Navigate('/courses');

}

const  modaldelete = ()=>
    {
        const fullopacity = document.getElementById("deletemodal").style.display="flex" ;
        const duratin = document.getElementById("deletemodal").style.scale= "100%" ;
        return fullopacity && duratin;
    } 

const  noselected = ()=>
    {
const fullopacity = document.getElementById("deletemodal").style.display="none" ;
        const duratin = document.getElementById("deletemodal").style.scale= "0%" ;
        return fullopacity && duratin;    
    }  

    return(
        
        <>
        {loading?
        <Loading/>
        :  
        <main>
        <Nav/>
        <br/>
        {/* {message&&
              <div className='py-1.5 flex justify-center  fixed top-14 w-full'>
                <p className={`text-white text-lg font-bold  px-40 rounded-xl ${messagecolor}` }>{message}</p>
              </div>} */}
        
        <div id="deletemodal" className="fixed hidden w-full h-full flex-col justify-center items-center scale-[0] duration-700 backdrop-blur-sm z-100">     
                <div  className="relative  z-0 w-[450px] h-[150px] bg-foreground flex flex-col justify-center space-y-6 rounded-lg duration-400">
                    <p className="text-center text-background text-base font-semibold">Are you sure you want to delete this Course</p>
                    <div className="flex justify-center space-x-4">
                        <button className="bg-red-500 px-4 py-1 rounded-md cursor-pointer duration-500 hover:bg-red-600 text-gray-100" onClick={HandelDelete}>yes</button>
                        <button className="bg-gray-500 px-4 py-1 rounded-md cursor-pointer duration-500 hover:bg-gray-600 text-gray-100" onClick={noselected}>No</button>
                    </div>
                 </div>
            </div>
            <br/>
        <div className="">

            <div className="w-[30%] sticky top-0 bottom-0 z-50  left-250 ">
                 <div className="absolute top-6.5  ">
                    <div className="flex flex-col  bg-white outline-gray-300 dark:outline-white/10 dark:bg-gray-900 dark:text-gray-200 text-gray-800  z-100 duration-700 outline-1  w-[300px] ">
                    <div  class=" space-y-5 ">
                        <div className="w-full h-[200px]">
                            <img src={token?ShowCourse.image_url:`http://127.0.0.1:8000/storage/${ShowCourse.image_url}`}  class=" w-full h-full z-50 " />
                        </div>

                        <div className="pl-5  z-100 ">
                            <span className="font-semibold text-lg transition duration-400"> {ShowCourse.title}</span>
                        </div>

                        <div className="px-5">

                            {user&&(user.role === 'admin' || user.id === ShowCourse.instructor.id)? 
                            <div className="flex flex-col space-y-4">
                                <Link to={`/courses/${ShowCourse.id}/update`} class="relative overflow-hidden w-full px-6 py-3 rounded-sm bg-indigo-500 text-white group hover:border hover:border-indigo-500 cursor-pointer hover:text-indigo-500 text-center">

                                        <span class="relative z-10 opacity-100 duration-300 ">
                                            Update &#9850;
                                        </span>

                                        <span class="absolute inset-0 bg-white -translate-x-full 
                                            group-hover:translate-x-0 transition-transform duration-400"></span>
                                </Link>

                                    <button onClick={modaldelete} class="relative overflow-hidden w-full px-6 py-3 rounded-sm bg-rose-500 text-white group hover:border hover:rose-indigo-500 cursor-pointer hover:text-rose-500 ">

                                        <span class="relative z-10 opacity-100 duration-300 ">
                                            Delete &#10006;
                                        </span>

                                        <span class="absolute inset-0 bg-white -translate-x-full 
                                            group-hover:translate-x-0 transition-transform duration-400"></span>
                                    </button>
                            </div>
                            :user&&user.role === 'instructor'?
                            <InputRating value={rating} onChange={setRating} />
                             
                            :
                            <div className="space-y-4 flex flex-col items-center"> 
                            {token?
                            <div className="w-full">
                                    {message&&<p className={`text-sm font-bold text-center py-2 rounded-xl w-full ${messagecolor}` }>{message}</p>}
                                {enrolled?
                                <button 
                                disabled={enrolled}
                                className="w-full px-6 py-3 rounded-sm bg-gray-600 text-white">Enrolled</button>
                                :
                                <button 
                                onClick={handleBooking} 
                                class="relative overflow-hidden w-full px-6 py-3 rounded-sm bg-indigo-500 text-white group hover:border hover:border-indigo-500 cursor-pointer hover:text-indigo-500">

                                        <span class="relative z-10 opacity-100 duration-300 ">
                                            Enroll now &#8594;
                                        </span>
                                        

                                        <span class="absolute inset-0 bg-white -translate-x-full 
                                            group-hover:translate-x-0 transition-transform duration-400"></span>
                                </button>
                                }
                                

                                </div>
                            
                            :
                            <Link to='/login' class="relative overflow-hidden w-full px-6 py-3 rounded-sm bg-indigo-500 text-white group hover:border hover:border-indigo-500 cursor-pointer hover:text-indigo-500">

                                        <span class="relative z-10 opacity-100 duration-300 ">
                                            Enroll now &#8594;
                                        </span>
                                        

                                        <span class="absolute inset-0 bg-white -translate-x-full 
                                            group-hover:translate-x-0 transition-transform duration-400"></span>
                                </Link>
                            }
                                
                                <span className="ml-4"><InputRating value={rating} onChange={setRating} /></span>
                            </div>
                           
                            }
                        
                        </div>
                        

                        <div className=" font-bold text-sm  pl-2 transition duration-400">  
                            <span>This Course include:</span>
                        </div>

                        <div className="flex flex-col space-y-4 pl-3 pb-4">
                            <div className="flex space-x-1  text-sm transition duration-400  rounded-full"> 
                            <Timer width="15px" height="15px"/><span> {ShowCourse.duration} Hours</span>
                            </div>  

                            <div className="flex space-x-2 text-sm  rounded-full  transition duration-400 "> 
                            <Youtube width="18px" height="18px" className=""/><p className="">{ShowCourse.videos} videos   </p>   
                            </div>

                            <div className="flex space-x-2 text-sm  rounded-full  transition duration-400 "> 
                            <Group width="18px" height="18px" className=""/><p className="">267 student  {ShowCourse.students}</p>   
                            </div>
                            
                        </div>
                        
                    </div>
                 </div>
                </div>
              </div>

              {/* <div className="w-full sticky top-0   ">
                <div className="absolute top-10 bottom "></div>
              </div> */}


        <div className=" flex justify-between mt-10 bg-[#13161b] py-4 px-10 z-0">
           

             {/* left section */}
             <div className="w-[65%] text-white px-10 space-y-10">
                <div className="w-150 ">
                     <h2 className=" font-bold pt-20 text-3xl ">{ShowCourse.title}</h2>
                </div>

                <div className="flex space-x-6">
                    <div className="flex space-x-2">
                        <div>                        
                            <span className="text-md font-bold">{ShowCourse.rating}</span><span className="text-md">/ 5</span>
                        </div>
                        <StarRating rating={ShowCourse.rating} />
                    </div>
                    <span>2,018 students</span>

                </div>

                <div className="flex space-x-42">
                    <div className="flex space-x-2">
                    <span className="font-bold">Instructor </span>
                    <span className="text-indigo-300">{ShowCourse.instructor ? ShowCourse.instructor.name : <div className="flex space-x-2">
                        <div className="w-6 h-6 bg-gray-200 rounded-full animate-spin overflow-hidden">
                                    <div className=" w-3 h-3 bg-indigo-300 rounded-t-full "></div>
                                    </div>
                                    <span>Loading</span>
                        </div>}</span>

                    
                    </div>

                    <div className="space-x-3">
                        <span>Category</span>
                        <span className="text-indigo-300">{ShowCourse.category.name}</span>
                    </div>
                    
                </div>
                

                
              

            
             </div>

              {/* right-section */}
              
             
            
           
        </div>

         {/* Content */}

        <div className=" py-10 px-30 ">
            {/* <div className="p-5 outline-1  -outline-offset-1 w-200 outline-gray-300 dark:outline-white/10 space-y-4">
                <h2 className="text-2xl font-bold">What you will learn</h2>
                <div className="grid grid-cols-2 gap-2.5">
                    <div className="space-x-2 flex">
                        <span className="text-green-500"> &#10004;</span>
                        <span>Build AI automation workflows using n8n and integrate LLMs for intelligent actions. {ShowCourse.learn}</span>

                    </div>
                    
                     <div className="space-x-2 flex">
                        <span className="text-green-500"> &#10004;</span>
                        <span>Connect n8n with APIs, databases, and apps to build end-to-end AI pipelines.</span>

                    </div>

                     <div className="space-x-2 flex">
                        <span className="text-green-500"> &#10004;</span>
                        <span>Deploy, monitor, and scale AI-driven workflows for production-ready automation.</span>

                    </div>

                     <div className="space-x-2 flex">
                        <span className="text-green-500"> &#10004;</span>
                        <span>Create Agentic AI systems that autonomously analyze, decide, and execute tasks.</span>

                    </div>

                     <div className="space-x-2 flex">
                        <span className="text-green-500"> &#10004;</span>
                        <span>Use tools, prompts, and workflows to design AI agents for real-world automation.</span>

                    </div>

                     
                </div>
            </div> */}

            <div className="pt-10 space-y-4 w-150">
                <h2 className="text-2xl font-bold">Requirements</h2>
                {ShowCourse.requirements}
                {/* <ul className="list pl-5">
                    <li>Familiarity with AI or LLMs adds value but beginners can follow easily.</li>
                    <li>A computer with internet access to run n8n and required tools.</li>
                    <li>Interest in automation, AI workflows, or building intelligent systems.</li>
                </ul> */}
            </div>

            <div className="pt-10 space-y-4 w-200">
                <h2 className="text-2xl font-bold">Description</h2>
                {ShowCourse.description}
                {/* <p>
                    AI automation and Agentic AI are redefining how modern businesses operate. With the rapid rise of intelligent agents, autonomous workflows, and no-code automation platforms, the ability to build AI-driven systems is becoming a core skill for developers, analysts, and AI professionals. n8n, a powerful open-source automation tool, is at the center of this transformation. It allows you to connect APIs, LLMs, business applications, and custom logic into smart automated workflows—without heavy coding.
                    <br/>
                    This course, Complete AI Automation And Agentic AI Bootcamp With n8n, gives you a comprehensive understanding of how to leverage n8n to create intelligent automation systems and build fully functional Agentic AI applications. From fundamentals to advanced automation, this course covers everything you need to design, develop, and deploy cutting-edge AI workflows.
                </p> */}
            </div>
            
        </div>
       
        
       </div>
       </main>
       }

        
        </>
    )
}