import { useForm } from "react-hook-form";
import { Authcontext } from "../../../Context/Autncontext/Authcontext";
import useAuthhooks from "../../../hooks/Authhooks";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLoginGoogle from "../../../Components/Logo/SocialLogin/socialLoginGoogle";
import axios from "axios";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { UpdateUserProfile, CreateUser } = useAuthhooks();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleRegister = (data) => {
    const profileImg = data.photo[0];
    CreateUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", profileImg);
        const imagebbHostApi = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_Image_host_key
        }`;
        axios
          .post(imagebbHostApi, formData)
          .then((imagedata) => {
            UpdateUserProfile({
              displayName: data.name,
              photoURL: imagedata.data.data.url,
            }).then(() => {
              navigate(location.state || "/");
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((eror) => {
        console.log(eror);
      });
  };
  return (
    <div className="card bg-base-100 p-10 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <h1 className="text-3xl font-extrabold text-neutral">
        Register to login
      </h1>
      <form onSubmit={handleSubmit(handleRegister)}>
        <fieldset className="fieldset">
          {/* Name Section */}
          <label className="label">Name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            className="input"
            placeholder="Name"
          />
          {errors?.email?.type === "required" && (
            <p className="text-red-500">Name required</p>
          )}
          {/* Photo section */}
          <label className="label">Photo</label>
          <input
            {...register("photo", { required: true })}
            type="file"
            className="file-input"
            placeholder="Photo"
          />
          {errors?.email?.type === "required" && (
            <p className="text-red-500">Photo required</p>
          )}
          {/* Email Section */}
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

          {/* <div>
            <a className="link link-hover">Forgot password?</a>
          </div> */}
          <button className="btn  outline-0 focus:outline-0 focus:ring-0 border-0 bg-primary mt-4">
            Register
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

export default Register;
