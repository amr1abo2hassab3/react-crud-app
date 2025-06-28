interface IProps {
  color: string;
  className?: string;
}

const CircleColor = ({ color, className }: IProps) => {
  return <span className={className} style={{ backgroundColor: color }} />;
};

export default CircleColor;
