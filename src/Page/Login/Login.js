import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../AuthProvider/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginerror, setloginerror] = useState("");
  const { login } = useContext(Context);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const LoginHandler = (data) => {
    setloginerror("");
    login(data.email, data.password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setloginerror(errorMessage);
      });
  };
  return (
    <div className="h-[500px] justify-center items-center flex border-2">
      <div className="">
        <div>
          <h2 className="text-center text-2xl">Sign In</h2>
        </div>
        <form
          onSubmit={handleSubmit(LoginHandler)}
          className="mt-3 pt-4 pl-10 pr-10 pb-10"
        >
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              style={{ borderRadius: "0px" }}
              type="email"
              placeholder="type your email"
              className="input w-[300px] input-bordered  "
              {...register("email", { required: "provide your email" })}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email?.message}</p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">password</span>
            </label>
            <input
              style={{ borderRadius: "0px" }}
              type="password"
              placeholder="type your password"
              className="input w-[300px] input-bordered"
              {...register("password", { required: "enter your password" })}
            />
            {errors.password && (
              <p className="text-red-600">{errors.password?.message}</p>
            )}
          </div>
          <div>
            <p className="text-red-600">{loginerror}</p>
            <button
              style={{ background: "#3333FF" }}
              className="btn w-[300px] mt-10 bg-[#6D3622]"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
