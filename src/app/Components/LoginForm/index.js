"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./style.css";
import {
  showSuccessNotification,
  showErrorNotification,
} from "@/app/utils/Notifications";
import httpLogin from "@/app/utils/httpLogin";
import LoadingAnimation2 from "../LoadingAnimation2";
import useAuthContextProvider from "@/app/hooks/useAuthContextProvider";

export default function LoginForm() {
  const router = useRouter();
  const { updateStoredAuthToken } = useAuthContextProvider();
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const [formData, setFormData] = useState({
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

  const login = async () => {
    setShowLoadingAnimation(true);
    const { phone, password } = formData;
    // validate user input
    if (phone.length > 0 && password.length >= 8) {
      // try creating an account
      console.log("starting");
      try {
        const res = await httpLogin({
          phone,
          password,
        });
        console.log(res);
        if (res.success == false) {
          // unsuccessfull account creation
          showErrorNotification(res.message);
        } else {
          console.log("success");
          // if successful log in
          // store returned token in localstorage
          updateStoredAuthToken(res.data.token);
          // greet user and redirect user to home page
          showSuccessNotification(`Hello ${res.data.firstName}`);
          router.replace("/");
        }
      } catch (error) {
        showErrorNotification(error);
        showErrorNotification("Something went wrong");
      }
    }
    // response to invalid user input
    else {
      showErrorNotification(
        `Please provide your
        phone number and a password 
        that is at least 8 characters long`
      );
    }
    console.log("setting login animation to false");
    setShowLoadingAnimation(false);
  };

  return (
    <div className="login-form-container">
      <form className="login-form">
        {showLoadingAnimation && <LoadingAnimation2 />}
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
          <label htmlFor="password">Password</label>
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

        {/* log in button section  */}
        <section className="logIn-btn-container">
          <button type="button" onClick={login}>
            Login
          </button>
        </section>
      </form>
    </div>
  );
}
