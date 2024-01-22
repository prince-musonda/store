"use client";
export default function PasswordValidation({ password }) {
  const passwordLength = password.length;
  // show that password is too short and show nothing when no password is entered
  if (passwordLength < 8 && passwordLength > 0) {
    return (
      <div>
        <p className="text-red-600">Password too short.</p>
        <p className="text-red-600">
          Password must be atleast 8 characters long
        </p>
      </div>
    );
  } else if (passwordLength > 0) {
    return <p className="text-green-500">Password looks great!!!</p>;
  }
}
