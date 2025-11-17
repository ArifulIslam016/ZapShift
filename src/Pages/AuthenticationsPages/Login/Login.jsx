import React from 'react';
import { useForm } from 'react-hook-form';
import useAuthhooks from '../../../hooks/Authhooks';
import { useNavigate } from 'react-router';

const Login = () => {
    const {register,handleSubmit,formState:{errors}}=useForm()
    const navigate=useNavigate()
    const {signInUser}=useAuthhooks()
    const handleLogin=(data)=>{
        signInUser(data.email,data.password).then(data=>{
            if(data){
                navigate('/')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    return (
        <div>
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
        </div>
    );
};

export default Login;