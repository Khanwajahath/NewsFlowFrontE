import { useForm } from "react-hook-form"


export   function Login() {
  const { register, handleSubmit } = useForm()
  const onSubmit = (data) => console.log(data)


  return (
    <div className="flex">
    <div>
      <img></img>
    </div>
    <form onSubmit={handleSubmit(onSubmit)} className="inline-block gap-2 mt-7">
      <div className=" ">
      <div>
      <label >enter First name</label>
      <input {...register("firstName", { required: true, maxLength: 20 })} className="border-2"/>
      </div>
      <div>
      <label>enter Last name</label>
      <input {...register("lastName", { required: true, maxLength: 20  })} className="border-2"/>
      </div>
      <div>
       <label>Age</label>
       <input type="number" {...register("age", { min: 12, max: 99 })} className="border-2"/>
      </div>
      <input type="submit" className="bg-blue-600 hover:bg-blue-400 rounded-2xl p-1 text-white"/>
      </div>
    </form>
    </div>
  )
}
   
 