import React from "react";
import styles from "./button.module.css";

function Button({ form, children, className, onClick, type, ...rest }) {
  let containerClass = styles.container;
  if (containerClass)
    containerClass += ` ${form ? styles[form] : ""} btn ${className}`;
  return (
    <button type={type} onClick={onClick} className={containerClass} {...rest}>
      {children}
    </button>
  );
}

export { Button };
