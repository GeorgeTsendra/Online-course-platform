import React from "react";
import styles from "./Button.module.scss";

type Variant = "primary" | "secondary" | "ghost";

export type UIButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  fullWidth?: boolean;
  isLoading?: boolean;
  className?: string;
};

const Button: React.FC<UIButtonProps> = ({
  children,
  variant = "primary",
  fullWidth = false,
  isLoading = false,
  className,
  disabled,
  ...rest
}) => {
  const classes = [
    styles.button,
    styles[`button--${variant}`],
    fullWidth ? styles["button--fullWidth"] : "",
    isLoading ? styles["button--loading"] : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && <span className={styles.spinner} aria-hidden />}
      <span className={styles.label}>{children}</span>
    </button>
  );
};

export default Button;
