import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import HeadingComponent from "../components/HeadingComponent";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import QuoteComponent from "../components/QuoteComponent";
import { signupType } from "@nayalsaurav/blogapp";
import { baseUrl } from "../utils";

const Signup = () => {
  const [form, setForm] = useState<signupType>({
    fullName: "",
    email: "",
    password: "",
  });

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((old) => ({
      ...old,
      [name]: value,
    }));
  }

  async function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const promise = axios.post(`${baseUrl}/user/signup`, form);
      toast.promise(promise, {
        loading: "Signing up...",
        success: "Account created successfully!",
        error: (error) =>
          error?.response?.data?.message || "Something went wrong!",
      });

      const response = await promise;
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen gap-40">
      <div className="w-full lg:w-1/2 p-7 md:p-25">
        <HeadingComponent
          heading="Create an account"
          subHeading="Already have an account?"
          link="Login"
          to="/signin"
        />
        <form onSubmit={onSubmitHandler}>
          <InputBox
            label="Full Name"
            name="fullName"
            type="text"
            value={form.fullName}
            placeholder="John Doe"
            onChangeHandler={onChangeHandler}
          />
          <InputBox
            label="Email"
            type="email"
            name="email"
            value={form.email}
            placeholder="jhondoe@gmail.com"
            onChangeHandler={onChangeHandler}
          />
          <InputBox
            label="Password"
            type="password"
            name="password"
            value={form.password}
            placeholder="Password"
            onChangeHandler={onChangeHandler}
          />
          <Button label="Sign up" />
        </form>
      </div>
      <div className="w-1/2 bg-slate-300 hidden lg:block">
        <QuoteComponent />
      </div>
    </div>
  );
};

export default Signup;
