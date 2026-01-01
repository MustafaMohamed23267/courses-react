  import { Link, useNavigate, useParams } from 'react-router-dom';
  import person from '../assets/home2.jpg';
  import { Nav } from './components/Nav';
  import { useEffect, useState } from 'react';

    export default function UpdateCourse()
  // export const UpdateCourse = ()=>
      {

      const addform = "block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500";
      const[course , setCourse] = useState({});
      const {id} = useParams();
          const [message , setMessage] = useState("");
      
     

        const [category , setCategory]= useState([]);
                useEffect(()=>
                    {
                        const fetchCourses = async()=>{
                            const res = await fetch("http://127.0.0.1:8000/api/category",{
                                method:"GET",
                                headers:{
                                    Accept:"application/json",
                                }
                                
                            })
                            const response  = await res.json();
                            setCategory(response.category);
                        }
                        
                        fetchCourses();
                    },[]);


                    //  mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
 const [form , setForm]=useState({
          title:"",
          rating:"",
          level:"",
          description:"",
          videos:"",
          requirements:"",
          duration:"",
          category_id:"",
          image_url:null
      });
       useEffect(() => {
        
        const fetchCourse = async()=>{
                    const res = await fetch(`http://localhost:8000/api/courses/${id}`,{
                        method:"GET",
                        headers:{
                            Accept:"application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                        
                    })
                    const result = await res.json();
                    setCourse(result.data);
                    setForm({
                          title:result.data.title||"",
                          rating:result.data.rating||"",
                          level:result.data.level||"",
                          description:result.data.description||"",
                          videos:result.data.videos||"",
                          requirements:result.data.requirements||"",
                          duration:result.data.duration||"",
                          category_id:result.data.category.name||"",
                          image_url:null

                          });
                              }
                
                fetchCourse();
            
       
        }, [id]);


       

                    // mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm

     
      const [errors , setErrors]=useState({});
      const Navigate = useNavigate();

      const HandelUpdate = async (e)=>{
          e.preventDefault();

          const DataForm = new FormData();
          DataForm.append('_method', 'PUT');
          DataForm.append("title",form.title);
          DataForm.append("rating",Number(form.rating));
          DataForm.append("level",form.level);
          DataForm.append("description",form.description);
          DataForm.append("videos", Number(form.videos));
          DataForm.append("requirements",form.requirements);
          DataForm.append("duration",Number(form.duration));
          DataForm.append("category_id",form.category_id);
          //  if (form.form.image_url) { }
                DataForm.append("image_url",form.image_url);
          

          const res = await fetch(`http://localhost:8000/api/courses/${id}`,{
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
                setMessage("course updated successfully");
                setTimeout(() => {
                  Navigate(`/courses/${id}`);
                }, 1000);
                  
              }

          }

          return(
              <>
              <Nav/>
              <br/>
               {message&&
              <div className='py-1.5 flex justify-center  fixed top-14 w-full z-100'>
                <p className='text-white text-lg font-bold bg-green-400 px-40 rounded-xl'>{message}</p>
              </div>}
              <main className="flex pt-5">
                  {/* left section */}
                  <div className="w-[50%]">
                      <div className=" flex flex-col items-center space-y-5 py-10">
                                    <h2 className='text-3xl'>Update Course </h2>
                                    <p className='font-semibold'>{course.title}</p>
                                      <p className='text-sm'>please enter the right data in the empty fields below</p>
                      
                      <form onSubmit={HandelUpdate} className="space-y-5">
                                        
                      
                                      <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder='course name...'
                                        onChange={(e)=>setForm({...form,title:e.target.value})}
                                        value={form.title}
                                        required
                                        className={addform}
                                      />
                                      {errors.title && <p className="text-base text-red-500 pt-2">{errors.title[0]}</p>}

                                      <select className={`${addform}  px-5`}  onChange={(e)=>setForm({...form,category_id:e.target.value})}>
                                        <option>{form.category_id}</option>
                                        {category.map(category=>
                                        
                                          <option className='dark:bg-gray-900'  key={category.id} value={category.id}>
                                            {category.name }
                                            </option>
                                        )}
                                      </select>
                                      {errors.category_id && <p className="text-base text-red-500 pt-2">{errors.category_id[0]}</p>}
                      


                                      <input
                                        id="level"
                                        name="level"
                                        type="text"
                                        placeholder='course Level...'
                                        onChange={(e)=>setForm({...form,level:e.target.value})}
                                        value={form.level}
                                        required
                                        className={addform}
                                      />
                                      {errors.level && <p className="text-base text-red-500 pt-2">{errors.level[0]}</p>}


                                      <input
                                        id="rate"
                                        name="rate"
                                        type="text"
                                        placeholder='course Rate...'
                                        onChange={(e)=>setForm({...form,rating:e.target.value})}
                                        value={form.rating}
                                        required
                                        className={addform}
                                      />
                                      {errors.rating && <p className="text-base text-red-500 pt-2">{errors.rating[0]}</p>}
                                
                                      <input
                                        id="duration"
                                        name="duration"
                                        type="number"
                                        onChange={(e)=>setForm({...form,duration:e.target.value})}
                                        value={form.duration}
                                        placeholder='Course duration...'
                                        required
                                        className={addform}
                                      />
                                      {errors.duration && <p className="text-base text-red-500 pt-2">{errors.duration[0]}</p>}

                                      <input
                                        id="videos"
                                        name="videos"
                                        type="number"
                                        onChange={(e)=>setForm({...form,videos:e.target.value})}
                                        value={form.videos}
                                        placeholder='Course videos...'
                                        required
                                        className={addform}
                                      />
                                      {errors.videos && <p className="text-base text-red-500 pt-2">{errors.videos[0]}</p>}

                                      <textarea
                                        id="requirements"
                                        name="requirements"
                                        placeholder='Requirements...'
                                        onChange={(e)=>setForm({...form,requirements:e.target.value})}
                                        value={form.requirements}
                                        required
                                        className={addform}
                                      ></textarea>
                                      {errors.requirements && <p className="text-base text-red-500 pt-2">{errors.requirements[0]}</p>}

                                      <textarea
                                        id="Description"
                                        name="Description"
                                        placeholder='Description...'
                                        onChange={(e)=>setForm({...form,description:e.target.value})}
                                        value={form.description}
                                        required
                                        className={addform}
                                      ></textarea>
                                      {errors.description && <p className="text-base text-red-500 pt-2">{errors.description[0]}</p>}

                                      {/* <textarea
                                        id="learn_what"
                                        name="learn_what"
                                        placeholder='what the student will learn from the course...'
                                        required
                                        className={addform}
                                      ></textarea> */}

                                      <input
                                        id="image"
                                        name="image"
                                        type="file"
                                        placeholder='Course image...'
                                        onChange={(e)=>setForm({...form,image_url:e.target.files[0]})}
                                        required
                                        className={`${addform} cursor-pointer` }
                                        
                                      />
                                      {errors.image_url && <p className="text-base text-red-500 pt-2">{errors.image_url[0]}</p>}
                                    
                      
                                      <button
                                        id="name1"
                                        name="name1"
                                        className="block w-100  rounded-md text-white bg-emerald-500 hover:bg-emerald-600 duration-500 cursor-pointer px-3 py-2.5 text-base "
                                      > Update</button>
                                      </form>
                                  
                                  </div>
                  </div>


                  {/* right section */}
                  <div className="w-[50%] p-2 rounded-md relative">
                      <div className=" absolute z-10 rounded-md  w-full bg-black/20"></div>
                      <img src={person} className='z-0 w-full absolute  rounded-md' />
                      <div className=' absolute top-70 left-20 z-100'>
                          <p className='text-white text-2xl font-semibold'>edufree help us be better in our fields by providing every course you need</p>
                      </div>
                  </div>

              </main>
              </>
          )
      }