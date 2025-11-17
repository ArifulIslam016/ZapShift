import React from "react";
import { useForm } from "react-hook-form";
import useAuthhooks from "../../../hooks/Authhooks";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLoginGoogle from "../../../Components/Logo/SocialLogin/socialLoginGoogle";

const Login = () => {
  const location=useLocation()
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { signInUser } = useAuthhooks();
  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((data) => {
        if (data) {
          navigate(location?.state||"/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="card bg-base-100 p-10 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <h1 className="text-3xl font-extrabold text-neutral">Welcome Back</h1>

      <form onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            {...register("email", { required: true })}
            type="email"
            className="input"
            placeholder="Email"
          />
          {errors?.email?.type === "required" && (
            <p className="text-red-500">Email required</p>
          )}
          <label className="label">Password</label>
          <input
            {...register("password", {
              required: true,
            })}
            type="password"
            className="input"
            placeholder="Password"
          />
          {errors?.password?.type === "required" && (
            <p className="text-red-500">Password cannot be empty</p>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn   outline-0 focus:outline-0 focus:ring-0 border-0 bg-primary mt-4">
            Login
          </button>
        </fieldset>
      </form>
      <p>
        New to Zapshipt?{" "}
        <Link state={location.state} className="text-pink-500 underline" to={"/register"}>
          Register
        </Link>
      </p>
      <SocialLoginGoogle></SocialLoginGoogle>
    </div>
  );
};

export default Login;
