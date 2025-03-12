import React, { useState } from "react";
import HeadingComponent from "../components/HeadingComponent";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import QuoteComponent from "../components/QuoteComponent";
import { signinType } from "@nayalsaurav/blogapp";
import axios from "axios";
import { baseUrl } from "../utils";
import toast from "react-hot-toast";

const Signin = () => {
  const [form, setForm] = useState<signinType>({
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
      const promise = axios.post(`${baseUrl}/user/signin`, form);
      toast.promise(promise, {
        loading: "Logging in...",
        success: "Logged in successfully!",
        error: (error) =>
          error?.response?.data?.message || "Something went wrong!",
      });
      const response = await promise;
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen gap-40">
      <div className="w-full lg:w-1/2 p-7 md:p-25">
        <HeadingComponent
          heading="Login"
          subHeading="Don't have an account?"
          link="Signup"
          to="/signup"
        />
        <form onSubmit={onSubmitHandler}>
          <InputBox
            label="Email"
            type="email"
            value={form.email}
            name="email"
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
          <Button label="Sign in" />
        </form>
      </div>
      <div className="w-1/2 bg-slate-300 hidden lg:block">
        <QuoteComponent />
      </div>
    </div>
  );
};

export default Signin;
