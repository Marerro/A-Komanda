import { useForm } from "react-hook-form";
import { Link , useNavigate} from "react-router";
import { useState } from "react";
import { getAllUsers } from "../helpers/get";


const LogInPage = () => {
  const { register, handleSubmit, reset, formState: { errors} } = useForm();
  const [error, setError] = useState("");
  const [logIn, setLogIn] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLogIn(true);
    setError("");
    try {
      const users = await getAllUsers(data);
      const existingUser = users.find(
        (user) => user.email === data.email && user.password === data.password
      );
      
      if(existingUser){
        reset();
        setLogIn(false)
        navigate("/home")
      }else{
        setError("User does not exist")
        reset();
      }
    } catch (error) {
      setError(error.message);
    }
  };
 console.log(logIn)
  return (
    <>
      <h1 className="text-xl p-5">Log in</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-5">
        <div>
          <input
            type="text"
            id="email"
            placeholder="Email"
            {...register("email", {required: "Can't be empty", pattern: {
              value: /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",}})}
          />
          <p className="text-error">{errors.email?.message}</p>
        </div>
        <div className="pt-5">
          <input
            type="password"
            id="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
        </div>

        <button type="submit" className="border border-black p-3 mt-5">
          Login to your account
        </button>
        {error && <p className="text-error">{error}</p>}
      </form>
      <p className="p-5">
        Don`t have an account? <Link to={`/signup`}>Sign Up</Link>{" "}
      </p>
    </>
  );
};

export default LogInPage;
