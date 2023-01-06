import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import useInput from "../hooks/use-input";
import axios from "axios";
import { loginRoute } from "../utils/apiRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  const {
    value: enteredUsername,
    isValid: enteredUsernameIsValid,
    hasError: usernameInputHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsernameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "");

  const toastOptions = {
    position: "bottom-right",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!enteredUsernameIsValid && !enteredPasswordIsValid) {
      return;
    }

    const { data } = await axios.post(loginRoute, {
      username: enteredUsername,
      password: enteredPassword,
    });
    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    }
    if (data.status === true) {
      localStorage.setItem("chat-app-user", JSON.stringify(data.user));
      navigate("/");
    }

    resetUsernameInput();
    resetPasswordInput();
  };
  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center gap-2 items-center bg-[#131324]">
        <form
          className="flex flex-col gap-8 bg-[#00000176] shadow-2xl shadow-indigo-500 px-6 sm:px-28 py-6 sm:py-14 rounded-3xl"
          onSubmit={(event) => handleSubmit(event)}
        >
          <div className="flex items-center gap-4 justify-center ">
            <img className=" h-10 sm:h-20" src={logo} alt="" />
            <h1 className="text-white uppercase text-xl">C H A T</h1>
          </div>
          <input
            className="bg-transparent p-2 sm:p-4 border-2 border-solid border-teal-400 rounded-lg text-white text-base focus:border-2 focus:border-solid focus:border-blue-500 focus:outline-none focus:bg-transparent"
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            onChange={usernameChangeHandler}
            onBlur={usernameBlurHandler}
            value={enteredUsername}
          />
          {usernameInputHasError && (
            <p className="text-red-500">Username field cannot be empty</p>
          )}
          {enteredUsernameIsValid && (
            <p className="text-green-500">Looks good!</p>
          )}
          <input
            className="bg-transparent p-2 sm:p-4 border-2 border-solid border-teal-400 rounded-lg text-white text-base focus:border-2 focus:border-solid focus:border-blue-500 focus:outline-none focus:bg-transparent"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword}
          />
          {passwordInputHasError && (
            <p className="text-red-500">Password field cannot be empty</p>
          )}
          {enteredPasswordIsValid && (
            <p className="text-green-500">Looks good!</p>
          )}
          <button
            className="bg-teal-400 text-white px-2 py-4 border-none font-bold cursor-pointer rounded-lg text-base uppercase transition-all ease-in-out duration-500 hover:bg-[#591c85]"
            type="submit"
          >
            Login
          </button>
          <span className="text-white">
            Don't have an account?{" "}
            <Link
              className="text-[#4e0eff] font-bold no-underline"
              to="/register"
            >
              Register
            </Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
