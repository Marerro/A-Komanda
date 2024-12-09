import { useState } from "react";
import { useForm } from "react-hook-form";
import { post } from "../helpers/post";
import { Link, useNavigate } from "react-router";
import { getAllUsers } from "../helpers/get";

const SignUpPage = () => {
  const [users, setUsers] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const userData = { email: data.email, password: data.password };
    try {
      const users = await getAllUsers();
      const existingUser = users.find((user) => user.email === userData.email);
      if (existingUser) {
        setError(`User with such an email already exist`);
        reset();
        return;
      } else {
        const newUser = await post(userData);
        setUsers((prev) => [...prev, newUser]);

        reset();
        setError("");
        navigate("/login");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  console.log(users);
  return (
    <>
      <h1 className="p-5 heading-l">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-5">
        <div>
          <input
            type="text"
            id="email"
            placeholder="Email"
            {...register("email", {
              required: "Can't be empty",
              pattern: {
                value: /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
          />
          <p className="text-error text-red">{errors.email?.message}</p>
        </div>
        <div className="pt-5">
          <input
            type="password"
            id="password"
            placeholder="Password"
            {...register("password", {
              required: "Can't be empty",
              pattern: {
                value:
                  /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[-+_!@#$%^&*.,?]).{8,}$/,
                message: "At least 8 characters, capital letter, symbol and number",
              },
            })}
          />
          <p className="text-error text-red">{errors.password?.message}</p>
        </div>
        <div className="pt-5">
          <input
            type="password"
            id="repeatPassword"
            placeholder="Repeat password"
            {...register("repeatPassword", {
              required: "Can't be empty",
              validate: (val) => {
                if (watch("password") != val) {
                  return "Passwords do not match";
                }
              },
            })}
          />
          <p className="text-error text-red">{errors.repeatPassword?.message}</p>
        </div>
        <button type="submit" className="border border-white p-3 mt-5 text-white">
          Create an account
        </button>
        {error && <p className="text-error">{error}</p>}
      </form>
      <p className="p-5 text-white">
        Already have an account? <Link to={`/login`} className="text-red">Login</Link>{" "}
      </p>
    </>
  );
};

export default SignUpPage;
