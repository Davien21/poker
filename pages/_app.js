import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";

import "../index.css";
import { Loader, Banner } from "../components";
import { AppProvider } from "../contexts/appContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <AppProvider>
        <Loader />
        <Banner />
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
}

export default MyApp;
