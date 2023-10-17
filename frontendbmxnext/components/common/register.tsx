"use client";
// Register page
import { useState } from "react";

export default function Register() {
  // Handle values from form
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState("");

  // Get values from form
  const handleUsername = (e: any) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  // Handle submit form
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Verifying the JSON data
    const jsonData = JSON.stringify({ Username, Email, Password });
    console.log("JSON Data:", jsonData);

    // Send data to backend
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BMX_URL}Auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: jsonData,
      }
    );

    // Get response from backend
    const data = await res.json();

    // Handle error
    if (data.error) {
      setError(data.message);
      return;
    }

    // Handle success
    if (data.token) {
      window.location.href = "/";
    }
  };

  return (
    <>
      <div className="hero min-h-screen bg-base-100">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Hello there get you account now to access your page
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-200">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">UserName</span>
                </label>
                <input
                  type="username"
                  placeholder="username"
                  className="input input-bordered"
                  required
                  onChange={handleUsername}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                  onChange={handleEmail}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  onChange={handlePassword}
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
