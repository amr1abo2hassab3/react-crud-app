import type { InputHTMLAttributes } from "react";

interface Iprops extends InputHTMLAttributes<HTMLInputElement> {
  className: string;
}

const Input = ({ className, ...rest }: Iprops) => {
  return <input className={className} {...rest} />;
};

export default Input;
