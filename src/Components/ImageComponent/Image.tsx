interface IProps {
  src: string | undefined;
  alt: string;
  className?: string;
}

const Image = ({ alt, src, className }: IProps) => {
  return <img src={src || undefined} alt={alt} className={className} />;
};

export default Image;
