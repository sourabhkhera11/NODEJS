import React from "react";
import { useState } from "react";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //To diplay there value on frontend use {email} thats how there value will be displaed
  //Here we have done 2 way binding : Which is used to take the control of input fields in the hands of react
  //Other wise it will be managed by dom and browser and on the go you cant validate them
  const loginHandler = async () => {
    try {
      const data = await axios.post("http://localhost:4000/hospital/login", {
        email,
        password,
      });
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="flex justify-center mt-5">
      <fieldset className="fieldset bg-base-200 border-base-500 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-2xl">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          placeholder="xyz@gmail.com"
        />

        <label className="label">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          placeholder="********"
        />

        <button className="btn btn-neutral mt-4" onClick={loginHandler}>
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
