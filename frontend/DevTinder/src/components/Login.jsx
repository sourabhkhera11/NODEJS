import React from "react";

const Login = () => {
  return (
    <div className="flex justify-center mt-5">
      <fieldset className="fieldset bg-base-200 border-base-500 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-2xl">Login</legend>

        <label className="label">Email</label>
        <input type="email" className="input" placeholder="xyz@gmail.com" />

        <label className="label">Password</label>
        <input type="password" className="input" placeholder="********" />

        <button className="btn btn-neutral mt-4">Login</button>
      </fieldset>
    </div>
  );
};

export default Login;
