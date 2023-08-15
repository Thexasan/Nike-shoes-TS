import React from "react";
import nike from "../assets/logo.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { saveToken } from "../utils/token";

const Sing = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const repsonse = await fetch(`${import.meta.env.VITE_APP_API_URL}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const token = await repsonse.json();
      console.log(token);
      saveToken(token.accessToken);
      navigate("/main");
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  };
  return (
    <>
      <div className="nike-container mt-[200px]">
        <div className="grid items-center justify-items-center">
          <div className="flex items-center justify-center">
            <img
              src={nike}
              alt="logo/png"
              className="w-16 h-auto cursor-pointer filter brightness-0"
            />
          </div>
          <div className="flex items-center m-auto justify-center p-[32px_27px] text-center max-w-[35ch]">
            <h1 className="text-[26px] leading-[26px] font-semibold">
              YOUR ACCOUNT FOR EVERYTHING NIKE
            </h1>
          </div>
          <form className="py-[30px]" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email"></label>
            <input
              type="email"
              inputMode="email"
              placeholder="Email"
              className="border-2 border-[#8888] w-full rounded  pl-[16px] pr-[200px] py-2"
              {...register("email", { required: true })}
            />
            {errors.email && (
                  <span className="text-red-600">This field is required</span>
                )}
            <br />
            <br />
            <label htmlFor="password"></label>
            <input
              type="password"
              inputMode="email"
              placeholder="Password"
              className="border-2 border-[#8888] w-full rounded  pl-[16px] pr-[200px] py-2"
              {...register("password", { required: true })}

            />{" "}
            {errors.password && (
                  <span className="text-red-600">This field is required</span>
                )}
            <br />
            <br />
            <div className="flex items-center gap-2">
              <input type="checkbox" className="ui-checkbox" />{" "}
              <label
                htmlFor="check"
                className="text-base font-[300] text-[#868686]"
              >
                Keep me in signed in
              </label>
            </div>
            <div className="text-center w-[80%] py-[20px] flex items-center justify-center m-auto">
              <p className="text-[12px] font-normal text-[#868686]">
                By logging in, you agree to Nike's{" "}
                <span className="border-b border-gray-500 cursor-pointer">
                  {" "}
                  Privacy Policy
                </span>{" "}
                and{" "}
                <span className="border-b border-gray-500 cursor-pointer">
                  Terms of Use
                </span>
                .
              </p>
            </div>
            <Button
              variant="contained"
              color="primary"
              sx={{ backgroundColor: "#000" }}
              className="w-full"
              type="submit"
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Sing;
