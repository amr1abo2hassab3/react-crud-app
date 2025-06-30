interface Iprops extends React.HTMLAttributes<HTMLSpanElement> {
  message: string;
}
const Available = ({ message, ...rest }: Iprops) => {
  return <span {...rest}>{message}</span>;
};

export default Available;
