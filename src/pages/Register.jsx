import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import useInput from "../hooks/use-input";
import PasswordRequisite from "../PasswordRequisite";
import axios from "axios";
import { registerRoute } from "../utils/apiRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [pwdRequisite, setPwdRequisite] = useState(false);
  const [checks, setChecks] = useState({
    capsLetterCheck: false,
    numberCheck: false,
    pwdLengthCheck: false,
    specialCharCheck: false,
  });

  const validatePassword = (value) => {
    const capsLetterCheck = /[A-Z]/.test(value);
    const numberCheck = /[0-9]/.test(value);
    const pwdLengthCheck = value.length >= 8;
    const specialCharCheck = /[!@#$%^&*]/.test(value);

    if (capsLetterCheck && numberCheck && pwdLengthCheck && specialCharCheck) {
      return true;
    }

    return false;
  };
  const {
    value: enteredUsername,
    isValid: enteredUsernameIsValid,
    hasError: usernameInputHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsernameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    valueChangeHandler: passwordChangeHandler,
    reset: resetPasswordInput,
  } = useInput((value) => validatePassword(value));

  const {
    value: enteredConfirmPassword,
    isValid: enteredConfirmPasswordIsValid,
    hasError: confirmPasswordInputHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPasswordInput,
  } = useInput((value) => {
    if (value !== "" && enteredPassword !== "" && value === enteredPassword) {
      return true;
    }
  });

  const handleOnKeyUp = (e) => {
    const { value } = e.target;
    const capsLetterCheck = /[A-Z]/.test(value);
    const numberCheck = /[0-9]/.test(value);
    const pwdLengthCheck = value.length >= 8;
    const specialCharCheck = /[!@#$%^&*]/.test(value);
    setChecks({
      capsLetterCheck,
      numberCheck,
      pwdLengthCheck,
      specialCharCheck,
    });
  };

  const passwordBlurHandler = (event) => {
    setPwdRequisite(true);
  };

  let formIsValid = false;

  if (
    enteredUsernameIsValid &&
    enteredPasswordIsValid &&
    enteredConfirmPasswordIsValid &&
    enteredEmailIsValid
  ) {
    formIsValid = true;
  }

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
    if (
      !enteredUsernameIsValid &&
      !enteredEmailIsValid &&
      !enteredPasswordIsValid &&
      !enteredConfirmPasswordIsValid
    ) {
      return;
    }

    const { data } = await axios.post(registerRoute, {
      username: enteredUsername,
      email: enteredEmail,
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
    resetEmailInput();
    resetPasswordInput();
    resetConfirmPasswordInput();
    setPwdRequisite(false);
  };
  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center gap-2 items-center bg-[#131324]">
        <form
          className="flex flex-col gap-5 sm:gap-8 bg-[#00000176] shadow-2xl shadow-indigo-500 px-6 sm:px-28 py-6 sm:py-14 rounded-3xl"
          onSubmit={(event) => handleSubmit(event)}
        >
          <div className="flex items-center gap-4 justify-center ">
            <img className="h-10 sm:h-20 animate-spin" src={logo} alt="" />
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
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
          />
          {emailInputHasError && (
            <p className="text-red-500">
              Email must include @ and not be empty
            </p>
          )}
          {enteredEmailIsValid && <p className="text-green-500">Looks good!</p>}
          <input
            className="bg-transparent p-2 sm:p-4 border-2 border-solid border-teal-400 rounded-lg text-white text-base focus:border-2 focus:border-solid focus:border-blue-500 focus:outline-none focus:bg-transparent"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword}
            onKeyUp={handleOnKeyUp}
          />
          {pwdRequisite && !enteredPasswordIsValid ? (
            <PasswordRequisite
              capsLetterFlag={
                checks.capsLetterCheck ? "text-green-500" : "text-red-500"
              }
              numberFlag={
                checks.numberCheck ? "text-green-500" : "text-red-500"
              }
              pwdLengthFlag={
                checks.pwdLengthCheck ? "text-green-500" : "text-red-500"
              }
              specialCharFlag={
                checks.specialCharCheck ? "text-green-500" : "text-red-500"
              }
            />
          ) : null}
          {enteredPasswordIsValid && (
            <p className="text-green-500">Looks good!</p>
          )}
          <input
            className="bg-transparent p-2 sm:p-4 border-2 border-solid border-teal-400 rounded-lg text-white text-base focus:border-2 focus:border-solid focus:border-blue-500 focus:outline-none focus:bg-transparent"
            type="Password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            onChange={confirmPasswordChangeHandler}
            onFocus={confirmPasswordBlurHandler}
            value={enteredConfirmPassword}
          />
          {confirmPasswordInputHasError && (
            <p className="text-red-500">Password does not match!</p>
          )}
          {enteredConfirmPasswordIsValid && (
            <p className="text-green-500">Passwords match!</p>
          )}
          <button
            className="bg-teal-400 text-white px-2 py-4 border-none font-bold cursor-pointer rounded-lg text-base uppercase transition-all ease-in-out duration-500 hover:bg-[#591c85]"
            disabled={!formIsValid}
            type="submit"
          >
            Sign Up
          </button>
          <span className="text-white">
            Already have an account?{" "}
            <Link className="text-[#4e0eff] font-bold no-underline" to="/login">
              Login
            </Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
