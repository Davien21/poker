import { useState } from "react";
import { useEffect } from "react";
import Emitter from "../../services/emitter";
import styles from "./banner.module.css";

function Banner() {
  const [isActive, setIsActive] = useState(false);
  const [bannerConfig, setBannerConfig] = useState({
    type: "success",
    message: "hello",
    onClose: null,
  });

  const { type, message, onClose } = bannerConfig;

  const title =
    type === "success" ? "🎉 Congratulations!" : "😕 Sorry you lost!";

  useEffect(() => {
    Emitter.on("BANNER", ({ type, message, onClose }) => {
      setIsActive(true);
      setBannerConfig({ type, message, onClose });
    });

    return () => {
      Emitter.off("BANNER", () => {
        setIsActive(false);
        setBannerConfig({ type: "success", message: "hello" });
      });
    };
  });
  let containerClass = `${styles["container"]}`;
  if (isActive) containerClass += ` ${styles["active"]}`;
  const closeBanner = () => {
    setIsActive(false);
    onClose();
  };

  useEffect(() => {
    document.body.style.overflow = isActive ? "hidden" : "auto";
    if (!isActive) document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isActive, setIsActive]);

  return (
    <div className={containerClass} onClick={closeBanner}>
      <div
        className={`${styles["banner-body"]} ${styles[type]} p-8`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className={` text-3xl`}>{title}</h3>{" "}
        <div className="mt-8 mb-4 text-base">{message}</div>
        <div className=" flex justify-end">
          <button className={`${styles["close-btn"]}`} onClick={closeBanner}>
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}

export { Banner };
