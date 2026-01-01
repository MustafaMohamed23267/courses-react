import { Link } from 'react-router-dom'
import bladerunner from '../assets/not.jpg'

export default function NotFound()
// export const NotFound = ()=>
    {
        return(
            <div className='relative h-screen w-screen overflow-hidden'>
                <img src={bladerunner} className=' absolute w-screen h-screen z-0'  />
                <div className='absolute w-full h-full bg-black/80'></div>
                    <div class="text-center relative h-screen flex flex-col items-center justify-center">
                        <p class=" font-bold text-indigo-400 text-6xl">404</p>
                        <h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">Page not found</h1>
                        <p class="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">Sorry, we couldn’t find the page you’re looking for.</p>
                        <div class="mt-10 flex items-center justify-center gap-x-6">
                        <Link to="/" class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 duration-300">Go back home</Link>
                        <a href="#" class="text-sm font-semibold text-white">Contact support <span aria-hidden="true">&rarr;</span></a>
                        </div>
                    </div>
                
            </div>
        )
    }