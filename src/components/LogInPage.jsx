import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { getAllUsers } from "../helpers/get";
import Logo from "/src/assets/logo.svg";
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
      <div className="flex flex-col place-items-center h-dvh">
        <div className="pb-[3.65rem] pt-[3rem] tablet:pt-[5rem] tablet:pb-[4.53rem] desktop:pt-[4.9rem] desktop:pb-[5.19rem]">
          <img src={Logo} className="w-[2rem] h-[1.6rem] " />
        </div>

        <div className="bg-semi-dark-blue w-[20.4375rem] h-[22.8125rem] rounded-[0.63rem] tablet:w-[25rem] tablet:h-[23.3125rem] tablet:rounded-[1.25rem] ">
          <h1 className="heading-l pl-[1.5rem] pt-[1.5rem] pb-[2.5rem] tablet:pl-[2rem] tablet:pt-[2rem]">
            Login
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" pl-[1.5rem] tablet:pl-[2rem]"
          >
            <div className="pb-[1.5rem]">
              <input
                type="text"
                id="email"
                placeholder="Email address"
                {...register("email", {
                  required: "Can't be empty",
                  pattern: {
                    value: /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email",
                  },
                })}
                className={`bg-semi-dark-blue border-0 border-b-[0.063rem] pb-5 pl-[1rem] tablet:w-[21rem] autofill:transition-colors autofill:duration-[999999999s] ${
                  errors.email ? "border-red" : "greyish-blue"
                }`}
              />
              <div className="relative">
                <p className="error-text text-red absolute bottom-3 left-[10.84rem] tablet:left-[14.44rem]">
                  {errors.email?.message}
                </p>
              </div>
            </div>
            <div className="pb-[2.5rem] ">
              <input
                type="password"
                id="password"
                placeholder="Password"
                {...register("password", { required: "Can't be empty" })}
                className={`bg-semi-dark-blue border-0 border-b-[0.063rem] pb-5 pl-[1rem] tablet:w-[21rem] autofill:transition-colors autofill:duration-[999999999s] ${
                  errors.password ? "border-red" : "greyish-blue"
                }`}
              />
              <div className="relative">
                <p className="error-text text-red absolute bottom-3 left-[10.84rem] tablet:left-[14.44rem]">
                  {errors.password?.message}
                </p>
              </div>
              <div className="relative">
                {error && (
                  <p className="error-text text-red absolute pl-[1.06rem] top-[0.5rem]">
                    {error}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="bg-red text-white body-m rounded-[0.375rem] w-[17.438rem] h-[3rem] hover:bg-white hover:text-semi-dark-blue hover:duration-500 tablet:w-[21rem]"
            >
              Login to your account
            </button>
          </form>
          <p className="body-m pl-[3.5rem] pt-[1.5rem] tablet:pl-[5.75rem]">
            Don`t have an account?{" "}
            <Link to={`/signup`} className="text-red body-m">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LogInPage;
