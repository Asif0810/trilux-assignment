import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../AuthProvider/AuthProvider";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const { registration, updateUser, user, selectDate } = useContext(Context);
  const date = format(selectDate, "PP");
  console.log(date);
  console.log(user?.email, user?.displayName);

  const [registererror, setRegsiterError] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const registerHandler = (data) => {
    registration(data.email, data.password)
      .then((result) => {
        const user = result.user;
        const updatedata = {
          displayName: data.name,
          photoURL: "",
        };
        updateUser(updatedata)
          .then(() => {
            const Name = user?.displayName;
            const Email = user?.email;
            const Date = date;
            const Profession = data?.Profession;
            const userInformation = {
              Name,
              Email,
              Date,
              Profession,
            };
            fetch("https://job-task-server-dun.vercel.app/all-user", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(userInformation),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                navigate("/");
              })
              .catch(console.error());
          })
          .catch(console.error());

        console.log(user);
      })
      .catch(console.error());
  };
  return (
    <div>
      <div className=" h-[700px]  flex items-center justify-center ">
        <div className=" rounded-xl py-6 px-9 shadow-2xl">
          <h2 className="text-center text-2xl">Sign Up</h2>

          <form
            onSubmit={handleSubmit(registerHandler)}
            className="drop-shadow-xl"
            action=""
          >
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                {...register("name", { required: "please provide username" })}
                type="text"
                placeholder="Type your Name"
                className="input    w-80 "
              />
              {errors.name && (
                <p className="text-red-500">{errors.name?.message}</p>
              )}
            </div>

            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Profession</span>
              </label>
              <input
                {...register("Profession", {
                  required: "please provide Profession",
                })}
                type="text"
                placeholder="Type your Name"
                className="input w-80 "
              />
              {errors.Profession && (
                <p className="text-red-500">{errors.Profession?.message}</p>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", {
                  required: "Email Address is required",
                })}
                type="text"
                placeholder="Type Your Email"
                className="input   w-80"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email?.message}</p>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", {
                  required: "passoword should be provide",
                  minLength: {
                    value: 6,
                    message: "password should be 6 character of longer",
                  },
                  pattern: {
                    value: /(?=.*[!@#$*])(?=.*[0-9])(?=.*[a-z].*[a-z])/,
                    message: `password must be strong`,
                  },
                })}
                type="password"
                placeholder="Type your Password"
                className="input  w-80"
              />

              {errors.password && (
                <p className="text-red-500">{errors.password?.message}</p>
              )}
              <p className="text-red-600">{registererror}</p>
            </div>
            <button
              style={{ background: "#3333FF" }}
              type="submit"
              className="btn mt-3 w-full"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
