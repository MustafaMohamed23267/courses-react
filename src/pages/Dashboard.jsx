import { ArrowUp, BadgeDollarSign, Bell, Book, BookAlert, BookOpenText, ChartBar, Cloud, DollarSign, HelpCircle, Home, House, Landmark, ListOrdered, Moon, NotebookIcon, PlusCircle, Search, Settings, ShoppingCart, Star, Sun, User, UserCircle, Users, Wind, X } from 'lucide-react'
import { Nav } from './components/Nav';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from './components/AppContext';
import { Link } from 'react-router-dom';
import StarRating from './components/StarRating';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

import course from '../assets/icons/courses.png';
import add from '../assets/icons/add.png';
import add2 from '../assets/icons/tab.png';
import student from '../assets/icons/student.png';
import instructor from '../assets/icons/instructors.png';
import cat from '../assets/icons/application.png';
import dashboard from '../assets/icons/dashboard2.png';
import enroll from '../assets/icons/enroll.png';
import galaxy from '../assets/galaxy3.jpg';
import day from '../assets/day2.jpg';

import InputRating from './components/InputRating';
import { IoCalendarClearOutline } from 'react-icons/io5';



export default function Dashboard(){
// export const Dashboard = ()=>{
const buttonstyle = "rounded-full px-6 py-4 max-sm:px-2 max-sm:py-2 bg-teal-900 dark:bg-gray-900/70 flex text-white hover:scale-[1.05] duration-500 cursor-pointer dark:inset-shadow-sm inset-shadow-indigo-500 ";

const fiterButtons = "rounded-xl flex flex-col items-center space-y-2 px-2 py-4 w-[175px]   dark:bg-gray-900 dark:outline-1 dark:outline-offset-2 dark:outline-white/10 text-white cursor-pointer hover:scale-[1.04] duration-500";
  const {user} = useContext(AppContext);
  let num = 1; 

  const [courses , setCourses]= useState([]);
  const [category , setCategory]= useState([]);
  const [students , setStudents] = useState([]);
  const [instructors, setInstructors] = useState([]);

  const [countStudent , setCountStudent] = useState(0);
  const [countInstructors, setCountInstructors] = useState(0);
  const [coursesCount , setCoursesCount]= useState(0);
  const [categoryCount , setCategoryCount]= useState(0);
  const [enrolledCount , setEnrolledCount]= useState(0);
  const [enrolledUsers , setEnrolledUsers]= useState([]);

  

  const[deletemodal , setDeletemodal] = useState(false);
  const[selectedCategory , setSelectedCategory] = useState(null);



  
  const [activeTable, setActiveTable] = useState(null); 

  const [deleteMessage , setDeleteMessage] = useState("");

  const[messagecolor , setMessagecolor] = useState("");

  const[instcourses , setInstcourses] = useState([]);

  const [instmenu , setInstmenu] = useState(false);



// mmmmmmmmmm    enrolled courses  mmmmmmmmmmmmmm//
            useEffect(()=>{

                const fetchenrolled = async ()=>{
                const getData = await fetch("https://courses-laravel-production.up.railway.app/api/book",{
                        method:"GET",
                        headers:{
                            Accept:"application/json"
                        }
                    })
                    const data  = await getData.json();
                    setEnrolledCount(data.enroll.length);
                    setEnrolledUsers(data.courses.filter(cor=>cor.users.length>0));
                    //.filter(user => user.role == "student") 

                }
                fetchenrolled();
                        },[]);


// mmmmmmmmmm    all Users  mmmmmmmmmmmmmm//
            useEffect(()=>
                            {
                            const fetchUsers = async()=>{
                                const res = await fetch("https://courses-laravel-production.up.railway.app/api/allusers",{
                                    method:"GET",
                                    headers:{
                                    Accept:"application/json",
                                        }
                                        
                                    })
                                    const response  = await res.json();
                                    setStudents(response.users);
                                    setInstructors(response.instructor);
                                    setCountStudent(response.users.length);
                                    setCountInstructors(response.instructor.length);

                                }
                                
                                fetchUsers();
                        },[]);

// mmmmmmmmmm    Fetch Courses  mmmmmmmmmmmmmm//
               useEffect(()=>
              {
                  const fetchCourses = async()=>{
                      const res = await fetch("https://courses-laravel-production.up.railway.app/api/allcourses",{
                          method:"GET",
                          headers:{
                              Accept:"application/json",
                          }
                          
                      })
                      const response  = await res.json();
                      setCourses(response);
                      setCoursesCount(response.length);
                     

                  }
                  
                  fetchCourses();
                        },[]);

// mmmmmmmmmm    all categories  mmmmmmmmmmmmmm//
               useEffect(()=>
              {
                  const fetchCategory = async()=>{
                      const res = await fetch("https://courses-laravel-production.up.railway.app/api/category",{
                          method:"GET",
                          headers:{
                              Accept:"application/json",
                          }
                          
                      })
                      const response  = await res.json();
                      setCategory(response.category);
                      setCategoryCount(response.category.length);
                     

                  }
                  
                  fetchCategory();
                        },[]);

//const allcounts = countStudent + countInstructors + coursesCount + categoryCount + enrolledCount ;
// mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm Delte function mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm

const deleteModalfunction = (cat)=>{
setDeletemodal(true);
setSelectedCategory(cat);
}

const notselected = ()=>{
    setDeletemodal(false);
setSelectedCategory(null);
}

const HandelDelete = async () => {
    if (!selectedCategory) return;

    try {
        const res = await fetch(
            `https://courses-laravel-production.up.railway.app/api/category/${selectedCategory.id}`,
            {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        if (!res.ok) {
            setDeletemodal(false);
            setSelectedCategory(null);
            setMessagecolor('text-red-600');
           
                setDeleteMessage("Can't Delete this Category it is related to other courses that will delete the course too"); 
                setTimeout(() => {
                   setDeleteMessage(""); 
                }, 3000);
                
            
            
               
            throw new Error("Delete failed");
        }

        const updated = category.filter(
            cat => cat.id !== selectedCategory.id
        );

        setCategory(updated);
        setCategoryCount(updated.length);
        setDeletemodal(false);
        setSelectedCategory(null);
        setMessagecolor("text-green-500");
        setDeleteMessage("Category deleted successfully"); 
        setTimeout(() => {
           setDeleteMessage('');
        }, 2000);
        
        

    } catch (error) {
        console.error(error);
    }
};

const handleinstructcourses = (instructId)=>
    {
        const instructor = instructors.find(ins => ins.id === instructId);
        setInstcourses(instructor?.courses || []); 
        setInstmenu(true);
       }


//  mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm tabels appearance functions mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm

const  getstudent = ()=>
    {
       setActiveTable("students");
           
    }  

  const  getinstructor = ()=>
    {
      setActiveTable("instructors");
    }  

    const  getcourses = ()=>
    {
      setActiveTable("courses");
    }  

    const  getcategory = ()=>
    {
      setActiveTable("category");
    }  

const enrolledtable = ()=>{
    setActiveTable("enrolledTable");
}

    
const data = [
  { name: 'Courses', value: coursesCount },
  { name: 'Students', value: countStudent },
  { name: 'Instructors', value: countInstructors },
  { name: 'Categories', value: categoryCount },
  { name: 'Enrolled', value: enrolledCount },
];

const COLORS = ['#4f46e5', '#06b6d4', '#f43f5e', '#f59e0b', '#065f42'];






    return(
        <>
        <Nav/>
        <br/>

        {/* mmmmmmmmmmm  Delete Modal  mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm */}
         {deletemodal && (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm z-50">
        <div className="w-[450px] h-[150px] bg-foreground flex flex-col justify-center space-y-6 rounded-lg">
            <p className="text-center text-background text-base font-semibold">
                Are you sure you want to delete{" "}
                <span className="text-red-500">
                    {selectedCategory?.name}
                </span>{" "}
                Category?
            </p>
            <div className="flex justify-center space-x-4">
                <button
                    className="bg-red-500 px-4 py-1 rounded-md hover:bg-red-600 text-gray-100"
                    onClick={HandelDelete}
                >
                    Yes
                </button>
                <button
                    className="bg-gray-500 px-4 py-1 rounded-md hover:bg-gray-600 text-gray-100"
                    onClick={notselected}
                >
                    No
                </button>
            </div>

            {/* {deleteMessage&&(<div>
                                <p className='text-center text-red-600'>{deleteMessage}</p>
                </div>)} */}
        </div>
    </div>
)}
<img src={galaxy} className='w-full h-screen fixed top-0 z-0 hidden dark:block duration-700' />
<img src={day} className='w-full h-screen fixed top-0 z-0  dark:hidden duration-700' />

<div className='fixed bg-black/70 w-full h-full top-0 z-5'></div>

         <div  className=' pt-15 w-full h-full z-10'>
      
        
            <main className='flex z-10 max-sm:flex-col items-center'>

                {/* left section */}
              <section className='md:w-[20%] px-5 flex md:flex-col  space-y-2 z-10 space-x-4 '>
                 <Link to='#' className={`${buttonstyle} space-x-2 border-l border-indigo-600`}> 
                <img src={dashboard} className={"w-6 h-6 max-sm:w-8"} /> 
                <span className='text-xl max-sm:hidden'>Dashboard</span>
                </Link>

                <Link to='/' className={buttonstyle}> 
                <span className='text-xl'> &#9962; </span><span className='text-xl max-sm:hidden'>Home</span>
                </Link>

                <Link to='/courses' className={`${buttonstyle} space-x-2`}> 
                <img src={course} className={"w-5 max-sm:w-8"} /> 
                <span className=' max-sm:hidden'>Courses</span>
                </Link>

                <Link to='/addcourse' className={`${buttonstyle} space-x-2`}> 
                <img src={add} className={"w-5 max-sm:w-8"} /> 
                <span className=' max-sm:hidden'>Add Courses</span>
                </Link>

                <Link to='/addcategory' className={`${buttonstyle} space-x-2`}> 
                <img src={add2} className={"w-5 fill-white max-sm:w-8"} />
                <span className=' max-sm:hidden'>Add Category</span>
                </Link>
                

              </section>

              {/* right section */}
              <section className='w-[75%] space-y-4 z-10'>
                <div className='flex max-sm:flex-col space-x-8'> 
                    <div className='flex items-center'> 
                        <div className='bg-teal-800 duration-500 dark:bg-gray-900/70 rounded-xl px-4 py-6 w-[620px] max-sm:w-[320px] text-white space-y-6 dark:inset-shadow-sm inset-shadow-indigo-500 dark:shadow-lg shadow-indigo-500/50'> 
                        <h2 className='text-4xl '>Welcome back,{user.name} &#9995;</h2>
                        <p>Track your manage and LMS platform performance </p>                  
                        </div>
                    </div>
                   
                    <PieChart width={320} height={270}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={20}
                            outerRadius={100}
                             label={({ percent }) =>
                                    `${(percent * 100).toFixed(1)}%`
                                }
                            dataKey="value"
                        >
                            {data.map((index, i) => (
                            <Cell key={index} fill={COLORS[i]}  />
                            ))}
                        </Pie>
                        <Tooltip />
                        </PieChart>
                  
                
                </div>
               

{/* mmmmmmmmmmmmmmm  count buttons mmmmmmmmmmmmmmmmmmmmmmmmm */}

                <div className=' flex max-sm:flex-col space-y-4 space-x-4 max-sm:items-center dark:bg-gray-900/70 bg-teal-900/70 p-10 rounded-t-lg rounded-b-[50px] dark:inset-shadow-sm inset-shadow-indigo-500 dark:shadow-lg shadow-indigo-500/50'>
                
                <div className='space-y-4'> 
                <button onClick={getcourses} className={`${fiterButtons} bg-[#4f46e5]`}>
                                    <img src={course} className={"w-8"} />
                                    {/* <MdOutlineSubject className='text-3xl text-gray-300 dark:text-white'/> */}
                                    <p className='text-sm text-gray-300 dark:text-white'>courses</p>
                                    <p className='font-bold  text-2xl '>{coursesCount}</p>
                </button>
                <div className='flex space-x-4 justify-center'>
                    <div className='w-4 h-4 mt-1 rounded-full bg-[#4f46e5]'></div>
                    <span className='text-white'>Courses</span>
                </div>
                </div>
                                

                <div className='space-y-4'> 
                    <button onClick={getstudent} className={`${fiterButtons} bg-[#06b6d4]`}>
                                        <img src={student} className={"w-8"} />
                                    {/* <PiStudentFill className=' text-3xl text-gray-300 dark:text-white'/> */}
                                    <p className='text-sm text-gray-300 dark:text-white'>number of students</p>
                                    <p className='font-bold  text-2xl '>{countStudent}</p>
                                    </button> 
                                 <div className='flex space-x-4 justify-center'>
                                    <div className='w-4 h-4 rounded-full mt-1 bg-[#06b6d4]'></div>
                                    <span className='text-white'>Students</span>
                                </div>
                    </div>

                 <div className='space-y-4'> 
     <button onClick={getinstructor} className={`${fiterButtons} bg-[#f43f5e]`}>
                      {/* <PiChalkboardTeacherFill className='text-3xl text-gray-300 dark:text-white'/> */}
                      <img src={instructor} className={"w-8"} />
                      <p className='text-sm text-gray-300 dark:text-white'>number of instructors</p>
                      <p className='font-bold text-2xl '>{countInstructors}</p>
                    </button>
  <div className='flex space-x-4 justify-center'>
                            <div className='w-4 h-4 rounded-full mt-1 bg-[#f43f5e]'></div>
                            <span className='text-white'>Instructors</span>
                    </div>
                    </div>
                   

               
                <div className='space-y-4'> 
<button onClick={getcategory} className={`${fiterButtons} bg-[#f59e0b]`}>
                      {/* <TbCategoryFilled className='text-3xl text-gray-300 dark:text-white'/> */}
                      <img src={cat} className={"w-8"} />
                      <p className='text-sm text-gray-300 dark:text-white'>Categories</p>
                      <p className='font-bold text-2xl  '>{categoryCount}</p>
                    </button>

<div className='flex space-x-4 justify-center'>
                                    <div className='w-4 h-4 rounded-full mt-1 bg-[#f59e0b]'></div>
                                    <span className='text-white'>Categories</span>
                                </div>
                    </div>
     
                  
                <div className='space-y-4'> 
                    <button onClick={enrolledtable} className={`${fiterButtons} bg-[#065f42]`}>
                      <img src={enroll} className={"w-8"} />
                      <p className='text-sm text-gray-300 dark:text-white'>Enrolled Courses</p>
                      <p className='font-bold text-2xl  '>{enrolledCount}</p>
                    </button>
                    <div className='flex space-x-4 justify-center'>
                                    <div className='w-4 h-4 rounded-full mt-1 bg-[#065f42]'></div>
                                    <span className='text-white'>Enrolled Courses</span>
                                </div>
                </div>
                   


                   
        

        
                    
        
                </div>
                {instmenu&&<div className="relative outline-1 outline-gray-400 dark:outline-white/20 space-y-4 z-20 bg-white dark:bg-gray-900 p-5 rounded-xl">
                <button onClick={()=>setInstmenu(false)} className='absolute top-1.5 right-1 cursor-pointer' ><X className='bg-rose-500 rounded-md text-white' /></button>
                
                  {instcourses.length > 0 && (
                        <div className="  space-y-4 z-20  ">
                            {instcourses.map(course => (
                                <p key={course.id} className="text-sm">
                                    <Link to={`/courses/${course.id}`} className='hover:text-indigo-600 duration-500' >{course.title}</Link>
                                                            
                                </p>
                                    ))}
                        </div>
                                        )}
                </div>}
               
{/*mmmmmmmmmmmmmmmmmm   tabels  mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm  */}
            <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base py-10 border-none border-default">
                    {deleteMessage&&(<div>
                                                <p className={`text-center  ${messagecolor}`}>{deleteMessage}</p>
                                </div>)}
                {activeTable === "students" && (

                    <table id="users" className=" w-full text-sm text-left rtl:text-right text-body bg-gray-100/80 dark:bg-gray-800 rounded-md">
                        <thead className="text-md font-bold bg-gray-100 dark:bg-gray-900">
                            <tr>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    User name
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    enrolled courses
                                </th>
                                
                            </tr>
                        </thead>
                        <tbody>
                        {students.map(student=>
                            <tr className="border-0  border-gray-300 dark:border-gray-900">
                                <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                    {num++}
                                </th>
                                <td className="px-6 py-4 font-bold text-teal-600">
                                    {student.name}
                                </td>
                                <td className="px-6 py-4">
                                    {student.email}
                                </td>
                                <td className="px-6 py-4">
                                    {student.enrolled_courses.length}
                                    {/* map(cors=><p>{cors.title}</p>) */}
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                )}
                    
                {activeTable === "instructors" && (
                <table id="instructor" className=" w-full text-sm text-left rtl:text-right text-body bg-gray-100/80 dark:bg-gray-800 rounded-md ">
                        <thead className="text-md font-bold  bg-gray-100 dark:bg-gray-900">
                            <tr>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    User name
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Created Courses
                                </th>
                                
                            </tr>
                        </thead>
                        <tbody>
                        {instructors.map(instruct=>
                            <tr className="border-0  border-gray-300 dark:border-gray-900">
                                <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                    {num++}
                                </th>
                                <td className="px-6 py-4 font-bold text-teal-600">
                                    {instruct.name}
                                </td>
                                <td className="px-6 py-4">
                                    {instruct.email}
                                </td>
                                <td className="px-6 py-4">
                                    

                                    <button onClick={()=>handleinstructcourses(instruct.id)} className='py-1 px-10 text-white bg-indigo-700 rounded-md cursor-pointer hover:scale-[1.03] duration-300'>{instruct.courses.length}</button>
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                )}

                {activeTable === "courses" && ( 
                <table id="instructor" className=" w-full text-sm text-left rtl:text-right text-body bg-gray-100/80 dark:bg-gray-800 rounded-md">
                        <thead className="text-md font-extrabold bg-gray-100 dark:bg-gray-900  rounded-md">
                            <tr>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Course name
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Level
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Instructor
                                </th>
                                <th scope="col" className="px-8 py-3 font-medium">
                                    Rate
                                </th>
                                
                            </tr>
                        </thead>
                        <tbody>
                        {courses.map(cor=>
                            <tr className="border-0 border-gray-300 dark:border-gray-900">
                                <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                    {num++}
                                </th>
                                <td className="px-3 py-4 font-bold text-teal-600 dark:text-teal-400">
                                    <Link to={`/courses/${cor.id}`} className='hover:text-teal-800 duration-500'>{cor.title}</Link>
                                </td>
                                <td className="px-3 py-4 font-bold text-violet-600">
                                    {cor.category.name}
                                </td>
                                <td className="px-3 py-4 text-gray-600 dark:text-gray-400">
                                    {cor.level}
                                </td>
                                <td className="px-3 py-4 text-indigo-600 dark:text-gray-400 font-semibold">
                                    {cor.instructor.name ? cor.instructor.name :"not found "}
                                </td>
                                <td className=" py-4 flex space-x-1 text-gray-600 dark:text-gray-400">
                                <p className='font-bold'>
                                    {cor.rating}
                                    <span> /5 </span>
                                </p>
                                    <StarRating rating={cor.rating}/>
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                )}
                            
                {activeTable === "category" && (
                <table id="instructor" className=" w-full text-sm text-left rtl:text-right text-body bg-gray-100/80 dark:bg-gray-800 rounded-md">
                        <thead className="text-md font-bold bg-gray-100 dark:bg-gray-900">
                            <tr className=" ">
                                <th scope="col" className="px-6 py-3 font-medium">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    category
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Field
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Action
                                </th>
                                
                                
                            </tr>
                        </thead>
                        <tbody>
                            
                        {category.map(cat=>
                            <tr className="border-0  border-gray-300 dark:border-gray-900">
                                <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                    {num++}
                                </th>
                                <td className="px-6 py-4 font-bold text-teal-600">
                                    {cat.name}
                                </td>
                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                    {cat.slug}
                                </td>
                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                    <div className='flex space-x-5 relative'>
                                        
                                        <Link to={`/category/${cat.id}/update`} className='font-bold text-teal-600 hover:text-teal-700 hover:scale-[1.1] duration-400'>Update</Link>
                                        <button onClick={()=>deleteModalfunction(cat)} className='font-bold text-rose-600 hover:text-rose-700 hover:scale-[1.1] cursor-pointer duration-400'>Delete</button>
                                    
                                        
                                        
                                    </div>
                                </td>
                            
                            </tr>
                            )}
                            
                        </tbody>
                    </table>
                )}

                {activeTable === "enrolledTable" && (
                <table id="instructor" className=" w-full text-sm text-left rtl:text-right text-body bg-gray-100/80 dark:bg-gray-900 rounded-md">
                        <thead className="text-md font-bold bg-gray-100 dark:bg-gray-800">
                            <tr className=" ">
                                <th scope="col" className="px-6 py-3 font-medium">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Course
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Count
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Student
                                </th>
                                
                                
                                
                            </tr>
                        </thead>
                        <tbody>
                            
                        {enrolledUsers.map(enr=>
                            <tr className="border-0 border-b border-gray-300 dark:border-gray-900">
                                <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                    {num++}
                                </th>
                                <td className="px-6 py-4 font-bold text-teal-600">
                                    {enr.title}
                                </td>
                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                    {enr.users_count}
                                </td>
                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                {enr.users && enr.users.length > 0 ? (
                                    enr.users.map(user => (
                                        <p key={user.id}>{user.name}</p>
                                    ))
                                    ) : (
                                    <p className='text-rose-500'>No students</p>
                                    )}
                                </td>
                            
                            </tr>
                            )}
                            
                        </tbody>
                    </table>
                )}
                
            </div>



{/* {enrolledUsers.map(course => (
  <div key={course.id} className="mb-6">
    <h2 className="text-xl font-bold">
      {course.title} {course.users_count}
    </h2>

    <ul className="ml-4 list-disc">
      {course.users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  </div>
))} */}

              </section>

             
             
              
            </main>

            {/* <InputRating value={rating} onChange={setRating} />
            <p className="mt-2 text-gray-400">
                Your rating: {rating}
            </p> */}
          </div>
            
        </>
    )
}



 {/* <header className='flex p-4 justify-between bg-gray-300'>
              <div className='flex space-x-15'>
                <span className='text-gray-700 text-xl'>Starline</span>
                <div className='flex flex-col space-y-2'>
                  <span className='text-gray-800 text-2xl'>welcome, Mustafa</span>
                  <span className='text-gray-400 text-sm'>Here `s what happening in your store</span>
                  </div>
              
              </div>
        
              <div>
                  <div className='rounded-full py-3 px-8 bg-gray-200 space-x-4 flex'>
                  <Search className='w-5  text-gray-400'/>
                  <Bell   className='w-5  text-gray-400'/>
                  <Moon   className='w-5  text-gray-400'/>
                  
                </div>
              </div>
             
              
            </header> */}
{/* <div className='bg-amber-100 rounded-3xl space-y-2 px-2 py-4'>
                      <div className='flex text-md space-x-4'> 
                        <BadgeDollarSign className='w-7 h-7 text-amber-400' /> 
                        <span className='text-gray-700 font-bold text-xl'>$85,000</span>
                        </div>
                      <div className='flex space-x-1'>
                        <ArrowUp className='w-5 text-green-500'/><span className='text-green-500'>10.5% </span>
                        <span className='ml-8 text-gray-500'>From Last Day</span>
                      </div>
        
                    </div>
        
                     <div className='bg-violet-200 rounded-3xl space-y-2 px-2 py-4'>
                      <div className='flex text-md space-x-4'> 
                        <ListOrdered className='w-7 h-7 text-violet-500' />
                         <div className='flex flex-col '> 
                         <span className='text-gray-700 font-bold text-lg'>1000</span>
                         <span className='text-gray-700 text-[12px]'>Total Orders</span>
                         </div>
                        </div>
                      <div className='flex space-x-1'>
                        <ArrowUp className='w-5 text-green-500'/><span className='text-green-500'>10.5% </span>
                        <span className='ml-8 text-gray-500'>From Last Day</span>
                      </div>
        
                    </div>
        
                       <div className='bg-sky-200 rounded-3xl space-y-2 px-2 py-4'>
                      <div className='flex text-md space-x-4'> 
                        <Users className='w-7 h-7 text-sky-500' />
                         <div className='flex flex-col '> 
                         <span className='text-gray-700 font-bold text-lg'>300</span>
                         <span className='text-gray-700 text-[12px]'>Total Customers</span>
                         </div>
                        </div>
                      <div className='flex space-x-1'>
                        <ArrowUp className='w-5 text-green-500'/><span className='text-green-500'>10.5% </span>
                        <span className='ml-8 text-gray-500'>From Last Day</span>
                      </div>
        
                    </div>
        
                    <div className='bg-teal-100 rounded-3xl space-y-2 px-2 py-4'>
                      <div className='flex text-md space-x-4'> 
                        <p className='text-gray-700 font-bold text-xl'>Sales</p>
                        
                        </div>
                      <div className='flex space-x-3'>
                         <div className='flex flex-col '> 
                         <span className='text-gray-700 font-bold text-sm'>Total Sales</span>
                         <span className='text-gray-700 text-[12px]'>9,586</span>
                         </div>
        
                          <div className='flex flex-col '> 
                         <span className='text-gray-700 font-bold text-sm'>Thus Month</span>
                         <span className='text-gray-700 text-[12px]'>6,279</span>
                         </div>
        
                          <div className='flex flex-col '> 
                         <span className='text-gray-700 font-bold text-sm'>Today</span>
                         <span className='text-gray-700 text-[12px]'>2,452</span>
                         </div>
                      </div>
                        
                      <div className='flex space-x-1'>
                        <ArrowUp className='w-5 text-green-500'/><span className='text-green-500'>10.5% </span>
                        <span className='ml-8 text-gray-500'>increased</span>
                      </div>
        
                    </div> */}

                    // mysql -h mysql.railway.internal -P 3306 -u root -p railway booking_courses.sql

                    // mysql://root:FMhbJXdnKLHclxFkcoCOuClJASWooFpI@shinkansen.proxy.rlwy.net:50301/railway