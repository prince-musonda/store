import { Roboto } from "next/font/google";
import "./globals.css";
import { ToastContainer, Bounce } from "react-toastify";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./Components/Navbar";
import { AuthContextProvider } from "./context/AuthContext";
import ProgressBarProvider from "./Components/ProgressBarProvider";

const roboto = Roboto({
  weight: ["100", "300"],
  subsets: ["latin"],
});

export const metadata = {
  title: "A Store",
  description: "A Store Ecommerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <AuthContextProvider>
          <NavBar />
          {/* progress Bar that shows during page navigation or route change */}
          <ProgressBarProvider>{children}</ProgressBarProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
