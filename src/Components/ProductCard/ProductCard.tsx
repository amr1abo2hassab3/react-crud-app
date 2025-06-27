import type { IProduct } from "../../interfaces";
import { textSlicer } from "../../utils/functions";
import Image from "../ImageComponent/Image";
import Button from "../ui/Button";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  const { title, price, category, colors, description, imageURL } = product;
  return (
    <div className="border rounded-md p-2 flex mx-auto flex-col max-w-sm md:max-w-lg">
      <Image className="rounded-md h-[300px]" alt={title} src={imageURL} />
      <h3 className="text-lg font-semibold">{textSlicer(title, 25)}</h3>
      <p className="text-xs text-gray-500 break-words">
        {textSlicer(description)}
      </p>
      <div className="flex items-center my-4 space-x-3">
        <span className="bg-indigo-600 w-5 h-5 rounded-full cursor-pointer" />
        <span className="bg-red-600 w-5 h-5 rounded-full cursor-pointer" />
        <span className="bg-yellow-600 w-5 h-5 rounded-full cursor-pointer" />
      </div>
      <div className="flex items-center justify-between mb-2">
        <span>${price}</span>
        <Image
          className="w-10 h-10 rounded-full object-fit-cover"
          alt={category.name}
          src={category.imageURL}
        />
      </div>
      <div className="flex items-center justify-between space-x-2">
        <Button className="bg-indigo-700 w-full">edit </Button>
        <Button className="bg-red-700 w-full ">delete</Button>
      </div>
    </div>
  );
};

export default ProductCard;
