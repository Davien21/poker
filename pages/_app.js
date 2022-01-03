import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import "tailwindcss/tailwind.css";

import "../index.css";
import { Header, Loader, SideBar, Banner } from "../components";
import { AppProvider } from "../contexts/appContext";
import { generateHand } from "../services/pokerService";

function MyApp({ Component, pageProps }) {
  const [openSideBar, setOpenSideBar] = useState(false);
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <AppProvider>
        <Loader />
        <Banner />
        {/* <Header onSetOpenSideBar={setOpenSideBar} /> */}
        {/* <SideBar isOpen={openSideBar} onSetOpenSideBar={setOpenSideBar} /> */}
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
}

export default MyApp;
