import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const Button = ({ children, className, ...rest }: IProps) => {
  return (
    <button
      {...rest}
      className={`${className} py-2 rounded-md text-white font-medium`}
    >
      {children}
    </button>
  );
};

export default Button;
