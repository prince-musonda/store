"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PasswordValidation from "../Components/PasswordValidation";
import {
  showErrorNotification,
  showSuccessNotification,
  showWarningNotification,
} from "../utils/Notifications";
import { useState } from "react";
import httpCreateAccount from "../utils/httpCreateAccount";
import "./style.css";
import LoadingAnimation2 from "../Components/LoadingAnimation2";
import useAuthContextProvider from "../hooks/useAuthContextProvider";

export default function CreateAccountPage() {
  const { updateStoredAuthToken } = useAuthContextProvider();
  const router = useRouter();
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const createAccount = async () => {
    setShowLoadingAnimation(true);
    // validate user input
    const { firstName, lastName, phone, password } = formData;
    if (firstName && lastName && phone && password.length >= 8) {
      // try creating an account
      try {
        const res = await httpCreateAccount({
          firstName,
          lastName,
          phone,
          password,
        });
        if (res.success == false) {
          // unsuccessfull account creation
          showErrorNotification(res.message);
        } else {
          // successful account creation
          // store returned token in localstorage
          updateStoredAuthToken(res.data.token);
          //welcome user
          showSuccessNotification(`Hello ${res.data.firstName}`);
          // and redirect user to home page
          router.replace("/");
        }
      } catch (error) {
        showErrorNotification(error);
      }
    }
    // response to invalid user input
    else {
      showWarningNotification(
        `Please provide your name, 
        phone number and a password 
        that is at least 8 characters long`
      );
    }
    setShowLoadingAnimation(false);
  };

  return (
    <>
      <div className="form-container">
        <form>
          {showLoadingAnimation && <LoadingAnimation2 />}
          <h1>Create an Account</h1>
          {/* first name */}
          <section>
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              onChange={onChangeHandler}
            />
          </section>
          {/* last name */}
          <section>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              onChange={onChangeHandler}
            />
          </section>
          {/* Phone Number */}
          <section>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="phone"
              name="phone"
              id="phone"
              placeholder="e.g  +260760000001"
              onChange={onChangeHandler}
            />
          </section>

          {/* password */}
          <section>
            <label htmlFor="password">Create Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              onChange={onChangeHandler}
            />
            {/* show or hide password button */}
            <button
              type="button"
              className="text-sm bg-gray-700 text-white p-1"
              onClick={showPasswordHandler}
            >
              {showPassword ? "Hide" : "show password"}
            </button>
          </section>

          {/* create an account button */}
          <button type="button" className="primary-btn" onClick={createAccount}>
            Create Account
          </button>

          {/* already has an account? */}
          <section>
            <p>Already have an account?</p>
            <Link href="/login" className="text-blue-600 bg-gray-300 px-3 py-2">
              Login
            </Link>
          </section>
          <PasswordValidation password={formData.password} />
        </form>
      </div>
    </>
  );
}
