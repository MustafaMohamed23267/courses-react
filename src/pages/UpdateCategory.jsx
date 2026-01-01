  import { Link, useNavigate, useParams } from 'react-router-dom';
  // import person from '../assets/home2.jpg';
  import { Nav } from './components/Nav';
  import {  useEffect, useState } from 'react';
export default function UpdateCategory()
//   export const UpdateCategory =()=>
      {

      const addform = "block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500";

      const {id} = useParams();
      const [category , setCategory]= useState([]);
      const[categoryMesssage , setCategoryMessage]=useState("");
      
      const [form , setForm]=useState({
          name:"",
          slug:"",
         
      });
       useEffect(()=>
                    {
                        const fetchCategory = async()=>{
                            const res = await fetch(`http://127.0.0.1:8000/api/category/${id}`,{
                                method:"GET",
                                headers:{
                                    Accept:"application/json",
                                }
                                
                            })
                            const response  = await res.json();
                            setCategory(response);
                            setForm(
                                {
                                name:response.name||"",
                                slug:response.slug||""
                                }

                            )                           
      
                        }
                        
                        fetchCategory();
                    },[id]);
    
        
 //  mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm

      

      const [errors , setErrors]=useState({});
      const Navigate = useNavigate();

      const HandelCreate = async (e)=>{
          e.preventDefault();

          const DataForm = new FormData();
          DataForm.append('_method', 'PUT');
          DataForm.append("name",form.name);
          DataForm.append("slug",form.slug);
          

          const res = await fetch(`http://127.0.0.1:8000/api/category/${id}`,{
              method:"POST",
              body:DataForm,
              headers:{
                        Accept: 'application/json',
                        Authorization: `Bearer ${localStorage.getItem("token")}`

              }
          });

          const course = await res.json();

          console.log(course);

          if(course.errors)
              {
                  setErrors(course.errors);
              
              }
              else{
                setCategoryMessage("category updated successfully");
                setTimeout(() => {
                    Navigate('/dashboard');
                }, 1500);
                  
              }

          }

          return(
              <>
              <Nav/>
              <br/>

              
                  <main className="flex flex-col items-center justify-center w-full h-screen">
                    {categoryMesssage&&<div>
                <span className='text-center text-lg text-green-500'>{categoryMesssage}</span>
                </div>}
                      <div className=" flex flex-col items-center space-y-5 py-10">
                                      <h2 className='text-3xl'>Update Category</h2>
                                      <p className='font-semibold '>{category.name}</p>
                                      <p className='text-sm'>please enter the right data in the empty fields below</p>
                      
                      <form onSubmit={HandelCreate} className="space-y-5">
                                        
                      
                                      <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder='Category name...'
                                        onChange={(e)=>setForm({...form,name:e.target.value})}
                                        value={form.name}
                                        required
                                        className={addform}
                                      />
                                      {errors.name && <p className="text-base text-red-500 pt-2">{errors.name[0]}</p>}


                                      <input
                                        id="field"
                                        name="field"
                                        type="text"
                                        placeholder='Category field...'
                                        onChange={(e)=>setForm({...form,slug:e.target.value})}
                                        value={form.slug}
                                        required
                                        className={addform}
                                      />
                                      {errors.slug && <p className="text-base text-red-500 pt-2">{errors.slug[0]}</p>}


                      
                                      <button
                                        id="name1"
                                        name="name1"
                                        className="block w-100  rounded-md text-white font-bold bg-emerald-500 hover:bg-emerald-600 duration-500 cursor-pointer px-3 py-2.5 text-base "
                                      > Update Category</button>
                                      </form>
                                  
                                  </div>
                  </main>


                 

              
              </>
          )
      }