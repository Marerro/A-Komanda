import { useState } from "react";
import { useForm } from "react-hook-form";
import { post } from "../helpers/post";
import { Link } from "react-router";



const SignUpPage = () => {
    const [users, setUsers] = useState([]);
    const { register, handleSubmit, watch, formState: { errors}, reset } = useForm();
    const [error, setError] = useState("");
 
    const onSubmit = async (data) => {
        const user = {email: data.email, password: data.password}
        try {
          const newUser = await post(user);
          setUsers(prev => [...prev, newUser]);
          
          reset();
          setError("");
        } catch (error) {
          setError(error.message);
        }
      }

      console.log(users)
    return ( <>
    <h1 className="text-xl p-5">Sign Up</h1>
    <form onSubmit={handleSubmit(onSubmit)} className="mx-5">
        <div>
            <input type="text" id="email" placeholder="Email" {...register("email", {required: "Can't be empty", pattern: {
                  value: /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",}})}/>
           <p className="text-error">{errors.email?.message}</p>
        </div>
        <div className="pt-5">
        <input type="password" id="password" placeholder="Password"{...register("password", {required: "Can't be empty",  pattern: {
                  value:  /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[-+_!@#$%^&*.,?]).{8,}$/,
                  message: "Password must contain at least 8 characters, a capital letter, symbol and a number",}})} />
        <p className="text-error">{errors.password?.message}</p>
        </div>
        <div className="pt-5">
        <input type="password" id="repeatPassword" placeholder="Repeat password" {...register("repeatPassword", {
                required: "Can't be empty",
                validate: (val) => {
                  if (watch("password") != val) {
                    return "Your passwords do no match";
                  }
                },
              })}/>
              <p className="text-error">{errors.repeatPassword?.message}</p>
        </div>
        <button  type="submit" className="border border-black p-3 mt-5">Create and account</button>
        {error && <p className="text-error">{error}</p>}
    </form>
    <p className="p-5">Already have an account? <Link to={`/login`}>Login</Link> </p>

    </>
    );
}
 
export default SignUpPage;