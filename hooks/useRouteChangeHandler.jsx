import { useState, useEffect } from "react";
import router from "next/router";
import { useAppContext } from "../contexts/appContext";
import Emitter from "../services/emitter";

function useRouteChangeHandler() {
  const [routeChanging, setRouteChanging] = useState(false);
  const { resetMarket } = useAppContext();
  useEffect(() => {
    const routeChangeStartHandler = () => {
      Emitter.emit("OPEN_LOADER");
      resetMarket();
      setRouteChanging(true);
    };

    const routeChangeEndHandler = () => {
      setRouteChanging(false);
      Emitter.emit("CLOSE_LOADER");
    };

    router.events.on("routeChangeStart", routeChangeStartHandler);
    router.events.on("routeChangeComplete", routeChangeEndHandler);
    router.events.on("routeChangeError", routeChangeEndHandler);
    return () => {
      router.events.off("routeChangeStart", routeChangeStartHandler);
      router.events.off("routeChangeComplete", routeChangeEndHandler);
      router.events.off("routeChangeError", routeChangeEndHandler);
    };
  }, []);
  return { routeChanging };
}

export default useRouteChangeHandler;
