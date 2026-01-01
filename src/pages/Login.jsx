import { Link, useNavigate } from 'react-router-dom';
import learn from '../assets/learn3.jpg';
import { Nav } from './components/Nav';
import { useContext, useState } from 'react';
import { AppContext } from './components/AppContext';
import { Theme } from './components/Theme';

export default function Login()
// export const Login = ()=>
  {

const[login , setLogin] = useState({
  email:"",
  password:"",
});
  const {setToken} =useContext(AppContext);
  const [errors , setErrors] = useState({});
  const navigate = useNavigate()
//const [loginfetch , setLoginfetch] = useState([]);
const [message , setMessage] = useState("");
const [passwordMessage , setPasswordMessage] = useState("");


const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = new FormData();
    loginData.append("email", login.email);
    loginData.append("password", login.password);

    const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        body: loginData,
        headers: {
            Accept: "application/json"
        }
    });

    const reg = await res.json();
    console.log(reg);

    if (!res.ok) {
        setErrors(reg.errors || {});
        setPasswordMessage("Wrong Password")
        return;
    }

    localStorage.setItem("token",  reg.data.token);
    setToken(reg.data.token);

    setMessage("Login successful!");

    setTimeout(() => navigate("/"), 1000);
};


    return( 
    <>
    <Nav/>
    {/* <div className='py-3'>
    <Theme/>
    </div>  */}
   
    {message&&
     <div className="bg-[#1d820e] z-100 absolute top-10 left-70 flex space-x-20 px-3 py-2 text-white w-100 duration-400 text-xl  rounded-l-full ">
      <div className="rounded-full p-1 bg-white/15">
        <span>✔</span>
      </div>
      <div> <span >{message}</span></div>
     
    </div>
    }
     <div className="flex flex-col items-center justify-center w-full h-screen p-15" >
        <div className="w-[90%] h-[90%] bg-teal-900  flex ">
            

            <div className="w-[50%] flex flex-col justify-center text-white items-center space-y-5 py-10">
                <h2 className='text-3xl'>Login</h2>
                <p className='text-sm'>please enter the right data in the empty fields below</p>

                <form onSubmit={handleLogin} className="space-y-5">
                   

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder='Email'
                  value={login.email}
                  onChange={(e)=>setLogin({...login,email:e.target.value})}
                  required
                  className="block w-100  rounded-md bg-white dark:bg-white/5 px-3 py-2.5 text-base text-foreground outline-1 -outline-offset-1 outline-gray-300 dark:outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder='Pass*******'
                  value={login.password}
                  onChange={(e)=>setLogin({...login,password:e.target.value})}
                  required
                  className="block w-100  rounded-md bg-white dark:bg-white/5 px-3 py-2.5 text-base text-foreground outline-1 -outline-offset-1 outline-gray-300 dark:outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />

               

                <button
                  id="name1"
                  name="name1"
                  className="block w-100  rounded-md bg-indigo-500 hover:bg-indigo-600 duration-500 cursor-pointer px-3 py-2.5 text-base "
                > Login</button>
                {errors.password&&<p className="text-base text-red-500 pt-2">{errors.password[0]}</p>}
                {passwordMessage&&<p className="text-base text-red-400 pt-2 ">{passwordMessage}</p>}
                </form>
                <p>Don't have an account ? <Link to="/register" className='text-indigo-400'>register  &#8594;</Link> </p>

            </div>

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

        </div>

     </div>
    </>)
}