import React from 'react';
import { useForm } from 'react-hook-form';
import useAuthhooks from '../../hooks/Authhooks';
import { useLoaderData } from 'react-router';

const BeARider = () => {
    const data=useLoaderData()
    const {user}=useAuthhooks()
    const {data,register,handleSubmit,formState:{errors}}=useForm()
    const 
    const handleBeARider=()=>{

    }
    return (
        <div className="card bg-base-100 p-10 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <h1 className="text-3xl font-extrabold text-neutral">
        Register to login
      </h1>
      <form onSubmit={handleSubmit(handleBeARider)}>
        <fieldset className="fieldset">
          {/* Name Section */}
          <label className="label">Name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            className="input"
            defaultValue={user?.displayName}
            placeholder="Name"
          />
           {errors?.name?.type === "required" && (
            <p className="text-red-500">Name required</p>
          )}
          <input
            {...register("email", { required: true })}
            type="text"
            className="input"
            defaultValue={user?.email}
            placeholder="email"
          />
          {errors?.email?.type === "required" && (
            <p className="text-red-500">email required</p>
          )}
          {/* Photo section
          <label className="label">Photo</label>
          <input
            {...register("photo", { required: true })}
            type="file"
            className="file-input"
            placeholder="Photo"
          />
          {errors?.email?.type === "required" && (
            <p className="text-red-500">Photo required</p>
          )} */}
          {/* Email Section */}
          <label className="label">Age</label>
          <input
            {...register("age", { required: true })}
            type="number"
            className="input"
            placeholder="Your Age"
          />
          {errors?.age?.type === "required" && (
            <p className="text-red-500">Age required</p>
          )}
          <label className="label">Nid No</label>
          <input
            {...register("nid", {
              required: true,
              minLength: 6,
              pattern: /^[A-Za-z]+$/i,
            })}
            type="number"
            className="input"
            placeholder="NId No"
          />
          <label className="label">Bike</label>
          <input
            {...register("bike", {
              required: true,
              minLength: 6,
              pattern: /^[A-Za-z]+$/i,
            })}
            type="text"
            className="input"
            placeholder="bike"
          />
         
          {/* <div>
            <a className="link link-hover">Forgot password?</a>
          </div> */}
          <button className="btn  outline-0 focus:outline-0 focus:ring-0 border-0 bg-primary mt-4">
            Apply
          </button>
        </fieldset>
      </form>
      <p>
        Already have an account?{" "}
        <Link
          state={location.state}
          className="text-pink-500 underline"
          to={"/login"}
        >
          Login
        </Link>
      </p>
      <SocialLoginGoogle></SocialLoginGoogle>
    </div>
    );
};

export default BeARider;