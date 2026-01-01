import { Login } from "./Login"
import { Register } from "./Register"

export const Enter = ()=>{
{/* <Register/> */}
{/* <Login/> */}
    return(
       <>
       <div>
        <button className="px-6 py-3 bg-emberald-400 cursor-pointer" onClick={<Login/>}>Login</button>
        <button className="px-6 py-3 bg-emberald-400 cursor-pointer" onClick={<Register/>}>Register</button>
       </div>
       
       </>
    )
}