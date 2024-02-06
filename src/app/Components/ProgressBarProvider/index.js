"use client";

import { AppProgressBar } from "next-nprogress-bar";

export default function ProgressBarProvider({ children }) {
  return (
    <>
      <AppProgressBar
        height="4px"
        color="#89CFF0"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </>
  );
}
