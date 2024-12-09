import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { getAllUsers } from "../helpers/get";
import Logo from "/src/assets/logo.svg";;
const LogInPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const [logIn, setLogIn] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLogIn(true);
    setError("");
    try {
      const users = await getAllUsers(data);
      const existingUser = users.find((user) => user.email === data.email);
      if (existingUser) {
        if (existingUser.password === data.password) {
          reset();
          setLogIn(false);
          navigate("/home");
        } else {
          setError("Incorrect password");
          reset({ password: "" });
        }
      } else {
        setError("User does not exist");
        reset();
      }
    } catch (error) {
      setError(error.message);
    }
  };
  console.log(logIn);
  return (
    <>
    <div><img src={Logo} /></div>
    <div  className="bg-semi-dark-blue w-[327px] h-[365px] flex-shrink-0 rounded-[10px]">
      <h1 className="heading-l pl-[24px] pt-[24px] pb-[32px]">Log in</h1>
      <form onSubmit={handleSubmit(onSubmit)} className=" pl-[24px]">
        <div className="pb-[24px]">
          <input
            type="text"
            id="email"
            placeholder="Email address"
            {...register("email", {
              required: "Can't be empty",
              pattern: {
                value: /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            className="h-[36px] "
          />
          <p className="text-error text-red">{errors.email?.message}</p>
        </div>
        <div className="pb-[40px]">
          <input
            type="password"
            id="password"
            placeholder="Password"
            {...register("password", { required: "Can't be empty" })}
            className="h-[36px]"
          />
          <p className="text-error text-red">{errors.password?.message}</p>
        </div>

        <button type="submit" className="bg-red text-white body-m rounded-[6px] w-[279px] h-[48px]">
          Login to your account
        </button>
        {error && <p className="text-error text-red">{error}</p>}
      </form>
      <p className="body-m pl-[56px] pt-[24px]">
        Don`t have an account? <Link to={`/signup`} className="text-red body-m">Sign Up</Link>
      </p>
      </div>
    </>
  );
};

export default LogInPage;
