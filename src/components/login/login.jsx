import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

export function Login() {
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
  })

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "https://news-flow-backend.vercel.app/api/auth/login",
        values
      )

      console.log(response.data)
      navigate("/newsboard")

    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Login failed")
      } else {
        alert("Server error")
      }

      console.error(error.response?.data || error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex-col">
      <div className="my-0 ms-2">
        <span className="font-bold text-2xl rounded p-1">News Flow</span>
      </div>
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form className="flex flex-col gap-4 w-1/2">
            <div className="flex items-center justify-between">
              <label className="text-white font-bold">Email</label>
              <div className="flex flex-col w-50">
                <Field
                  name="email"
                  type="email"
                  className="px-4 py-2 rounded-2xl bg-gray-200 placeholder-gray-500 focus:outline-none w-full"
                  placeholder="Enter email"
                />
                <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-white font-bold">Password</label>
              <div className="flex flex-col w-50">
                <Field
                  name="password"
                  type="password"
                  className="px-4 py-2 rounded-2xl bg-gray-200 placeholder-gray-500 focus:outline-none w-full"
                  placeholder="Enter password"
                />
                <ErrorMessage name="password" component="div" className="text-red-400 text-sm mt-1" />
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-600 text-white px-1 py-1 font-bold rounded hover:bg-blue-700 transition w-25 items-center"
              >
                Login
              </button>
              <Link to="/register">Don't have an account?</Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}