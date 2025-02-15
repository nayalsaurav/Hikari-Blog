import React, { useState } from "react";
import HeadingComponent from "../components/HeadingComponent";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import QuoteComponent from "../components/QuoteComponent";
import { signinType } from "@nayalsaurav/blogapp";

const Signin = () => {
  const [form, setForm] = useState<signinType>({
    email: "",
    password: "",
  });
  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }
  function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(form);
  }
  return (
    <div className="flex justify-center items-center min-h-screen gap-40">
      <div className="w-full  lg:w-1/2 p-7 md:p-25">
        <HeadingComponent
          heading="Login"
          subHeading="Don't have an account?"
          link="Signup"
          to="/signup"
        />
        <form
          onSubmit={(e) => {
            onSubmitHandler(e);
          }}
        >
          <InputBox
            label="email"
            type="email"
            value={form.email}
            name="email"
            placeholder="jhondoe@gmail.com"
            onChangeHandler={onChangeHandler}
          />
          <InputBox
            label="password"
            type="password"
            name="password"
            value={form.password}
            placeholder="password"
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
