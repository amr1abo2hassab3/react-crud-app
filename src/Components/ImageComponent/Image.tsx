interface IProps {
  src: string;
  alt: string;
  className?: string;
}

const Image = ({ alt, src, className }: IProps) => {
  return <img src={src} alt={alt} className={className} />;
};

export default Image;
