import clsx from "clsx";
import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

const variantClasses = {
  primary: "bg-blue-600 text-white font-light",
  secondary: "bg-blue-200 text-blue-600 font-light",
};

const defaultAttributes = "rounded-md flex items-center px-3 py-2 m-2";

export function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={clsx(
        variantClasses[props.variant],
        defaultAttributes,
        { "w-full flex justify-center items-center": props.fullWidth },
        { "opacity-45": props.loading }
      )}
      disabled={props.loading}
    >
      {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null}{" "}
      {props.text}
    </button>
  );
}
