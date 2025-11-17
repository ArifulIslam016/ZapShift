import React, { use } from "react";
import { useForm } from "react-hook-form";
import { Authcontext } from "../../../Context/Autncontext/Authcontext";
import useAuthhooks from "../../../hooks/Authhooks";
import { useNavigate } from "react-router";

const Register = () => {
    const navigate=useNavigate()
  const { signInUser, CreateUser } = useAuthhooks();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleRegister = (data) => {
    CreateUser(data.email, data.password)
      .then((data) =>{
        if(data){
            navigate('/')
        }
      })
      .catch((eror) => {
        console.log(eror);
      });
  };
  return (
    <div>
        <h1 className="text-3xl font-extrabold text-neutral">Register to login</h1>
      <form onSubmit={handleSubmit(handleRegister)}>
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
              minLength: 6,
              pattern: /^[A-Za-z]+$/i,
            })}
            type="password"
            className="input"
            placeholder="Password"
          />
          {errors?.password?.type === "required" && (
            <p className="text-red-500">Password required</p>
          )}
          {errors?.password?.type === "minLength" && (
            <p className="text-red-500">Password must be 6 charecters</p>
          )}
          {errors?.password?.type === "pattern" && (
            <p className="text-red-500">Only letters are allowed.</p>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn  outline-0 focus:outline-0 focus:ring-0 border-0 bg-primary mt-4">
            Register
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
