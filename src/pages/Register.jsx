import { Link, useNavigate } from 'react-router-dom';
import learn from '../assets/learn3.jpg';
import { Nav } from './components/Nav';
import {  useContext, useState } from 'react';
import { AppContext } from './components/AppContext';

export default function Register()
// export const Register = ()=>
  {


  
const [form , setForm] = useState({
  name:"",
  email:"",
  password:"",
  password_confirmation:"",
  role:""
});

const[errors , setErrors] = useState({});
const navigate = useNavigate();
const {token,setToken}  = useContext(AppContext);
const [message , setMessage] = useState("");



const RegistterForm = async (e)=>
  {
    e.preventDefault();
    const data = new FormData();
    data.append("name",form.name);
    data.append("email",form.email);
    // data.append("birthdate",form.birthdate);
    data.append("password",form.password);
    data.append("password_confirmation",form.password_confirmation);
    data.append("role",form.role);

    const res = await fetch("https://courses-laravel-production.up.railway.app/api/register",{
      method:"POST",
      body:data,
      headers:{
        Accept:"application/json",
      }
    });
    const reg = await res.json();

    console.log(token);

    if (reg.errors) {
    setErrors(reg.errors || {});
  }
  else
    {
      console.log("Registration succeeded:", reg); // make sure token exists
      localStorage.setItem("token", reg.data.token);
      setToken(reg.token);
      setMessage("Registration successful!");
      setTimeout(() => {
         navigate('/');
      }, 2000);
    }

  }

    return( 
    <>
    {/* <Nav/> */}
{message&&
     <div className="bg-[#1d820e] z-100 absolute top-10 left-70 flex space-x-20 px-3 py-2 text-white w-150 duration-400 text-xl  rounded-l-full ">
      <div className="rounded-full p-1 bg-white/15">
        <span>✔</span>
      </div>
      <div> <span >{message}</span></div>
     
    </div>
    }     <div className="flex flex-col items-center justify-center w-full h-screen  py-10" >
        <div className="w-[90%] h-full bg-teal-900  flex ">
            <div className="w-[50%] relative overflow-hidden">
                <div className=" absolute z-10  w-full h-full bg-gray-900/70"></div>
                <img src={learn} className='absolute w-full h-full z-0 object-cover' />
                 <div className="relative z-10 h-screen text-white flex flex-col py-15 px-7 space-y-6">
                      <span className="font-bold text-5xl">Hello there</span>
                      <span className=" text-2xl">One step further</span>
                      <span className=" text-2xl">Close to Your dreams</span>
                      <p className="text-md max-sm:w-full max-sm:px-6">A free e-learning service 
                        <br/>that helps improve your learning skills </p>
                   </div>
            </div>

            <div className="w-[50%] flex flex-col text-white items-center space-y-4 py-5">
                <h2 className='text-3xl'>Register</h2>
                <p className='text-sm'>please enter your data in the empty fields below</p>

                <form onSubmit={RegistterForm} className="space-y-5">
                  <input
                  id="name1"
                  name="name1"
                  type="text"
                  placeholder='Your Name'
                  onChange={(e)=>setForm({...form,name:e.target.value})}
                  value={form.name}
                  required
                  className="block w-100  rounded-md bg-white dark:bg-white/5 px-3 py-2.5 text-base text-foreground outline-1 -outline-offset-1 outline-gray-300 dark:outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
                {errors.name&&<p className="text-base text-red-500 pt-2">{errors.name[0]}</p>}

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder='Email'
                  onChange={(e)=>setForm({...form,email:e.target.value})}
                  value={form.email}
                  required
                  className="block w-100  rounded-md bg-white dark:bg-white/5 px-3 py-2.5 text-base text-foreground outline-1 -outline-offset-1 outline-gray-300 dark:outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
                {errors.email&&<p className="text-base text-red-500 pt-2">{errors.email[0]}</p>}

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder='Pass*******'
                  onChange={(e)=>setForm({...form,password:e.target.value})}
                  value={form.password}
                  required
                  className="block w-100  rounded-md bg-white dark:bg-white/5 px-3 py-2.5 text-base text-foreground outline-1 -outline-offset-1 outline-gray-300 dark:outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
                {errors.password&&<p className="text-base text-red-500 pt-2">{errors.password[0]}</p>}

                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  placeholder='Confirm Pass*******'
                  onChange={(e)=>setForm({...form,password_confirmation:e.target.value})}
                  value={form.password_confirmation}
                  required
                  className="block w-100  rounded-md bg-white dark:bg-white/5 px-3 py-2.5 text-base text-foreground outline-1 -outline-offset-1 outline-gray-300 dark:outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
                {errors.password_confirmation&&<p className="text-base text-red-500 pt-2">{errors.password_confirmation[0]}</p>}

                  


                <div className='flex space-x-10'>
                  <div  className='flex space-x-2'>
                  <label>Instructor</label>
                  <input type="radio" 
                  name="user" 
                  value="instructor"
                  onChange={(e)=>setForm({...form, role: e.target.value})} 
                  />
                  </div>

                  <div  className='flex space-x-2'>
                  <label>Student</label>
                  <input type="radio" 
                  name="user" 
                  value="student"
                  onChange={(e)=>setForm({...form, role: e.target.value})} 
                  />
                  </div>

                </div>

                <button
                  id="register"
                  name="register"
                  className="block w-100  rounded-md bg-indigo-500 hover:bg-indigo-600 duration-500 cursor-pointer px-3 py-2.5 text-base "
                > Register</button>
                </form>
                <p>Already have an account ? <Link to="/login" className='text-indigo-400'>Login&#8594;</Link> </p>
            </div>

        </div>

     </div>
    </>)
}