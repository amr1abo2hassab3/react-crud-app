interface Iprops {
  message: string;
  className?: string;
}

const ErrorMessage = ({ className, message }: Iprops) => {
  return message ? <span className={className}>{message}</span> : null;
};

export default ErrorMessage;
