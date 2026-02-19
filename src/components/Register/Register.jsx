import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom";


export function Register() {
  const navigate=useNavigate()
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    age: Yup.number()
      .required("Age is required")
      .min(18, "Must be at least 16"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
  })

const handleRegister = async (values, { setSubmitting }) => {
  try {
    const response = await axios.post(
      "https://news-flow-backend.vercel.app/api/auth/register",
      values
    );

    console.log(response.data);

    // If registration successful → go to login
    navigate("/login");

  } catch (error) {

    if (error.response) {
      const message = error.response.data.message;

      if (error.response.status === 409 || message === "User already exists") {
        alert("User already exists. Please login.");
        navigate("/login");   // 👈 redirect here
      } else {
        alert(message);
      }
    } else {
      alert("Server error");
    }

    console.error(error.response?.data || error.message);

  } finally {
    setSubmitting(false);
  }
};


  return (
    <div className="flex-col">
      <div className="my-0 ms-2 ">
            <span className='font-bold text-2xl rounded p-1' >News Flow</span>
      </div>
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Formik
        initialValues={{
          username: "",
          age: "",
          email: "",
          password: ""
        }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        <Form className="flex flex-col gap-4 w-1/2">
          <div className="flex items-center justify-between">
            <label className="text-white font-bold">User name</label>
            <div className="flex flex-col w-50">
              <Field
                name="username"
                className="px-4 py-2 rounded-2xl bg-gray-200 placeholder-gray-500 focus:outline-none w-full"
                placeholder="Enter username"
              />
              <ErrorMessage name="username" component="div" className="text-red-400 text-sm mt-1" />
            </div>
          </div>


          <div className="flex items-center justify-between">
            <label className="text-white font-bold">Age</label>
            <Field
              name="age"
              type="number"
               min="16"
              className="px-4 py-2 rounded-2xl bg-gray-200 focus:outline-none w-50"
              placeholder="Enter age"
            />
            <ErrorMessage name="age" component="div" className="text-red-400 text-sm" />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-white font-bold">Email</label>
            <Field
              name="email"
              type="email"
              className="px-4 py-2 rounded-2xl bg-gray-200 focus:outline-none w-50"
              placeholder="Enter email"
            />
            <ErrorMessage name="email" component="div" className="text-red-400 text-sm" />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-white font-bold">Password</label>
            <Field
              name="password"
              type="password"
              className="px-4 py-2 rounded-2xl bg-gray-200 focus:outline-none w-50"
              placeholder="Enter password"
            />
            <ErrorMessage name="password" component="div" className="text-red-400 text-sm" />
          </div>
          <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white px-1 py-1 font-bold rounded hover:bg-blue-700 transition
            w-25 items-center"
          >
            Register
          </button>
          <Link to="/login">
  Already have an account?
</Link>
          </div>
        </Form>
      </Formik>
    </div>
    </div>
  )
}
