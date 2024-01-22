import Link from "next/link";
import LoginForm from "../Components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <h1 className="text-center text-2xl">
        Welcome back to{" "}
        <Link href="/" className="text-blue-500 font-bold">
          Amora Store
        </Link>
      </h1>
      <h2 className="text-center text-lg -mb-8">
        please Login into your account
      </h2>{" "}
      <LoginForm />
      <h3 className="text-center -mt-8">
        Don't have an account?{"  "}
        <Link
          href={"/register"}
          className="text-blue-500  text-lg whitespace-nowrap"
        >
          create an account
        </Link>
      </h3>
    </>
  );
}
