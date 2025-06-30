import type { IProduct } from "../../interfaces";
import { textSlicer } from "../../utils/functions";
import Image from "../ImageComponent/Image";
import Available from "../ui/Available";
import Button from "../ui/Button";
import CircleColor from "../ui/CircleColor";

interface IProps {
  product: IProduct;
  setProductToEdit: React.Dispatch<React.SetStateAction<IProduct>>;
  setIsOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setProductIndex: React.Dispatch<React.SetStateAction<number>>;
  deleteProduct: (index: number) => void;
  index: number;
}

const ProductCard = ({
  product,
  setProductToEdit,
  setIsOpenEdit,
  setProductIndex,
  deleteProduct,
  index,
}: IProps) => {
  const { title, price, category, colors, description, imageURL } = product;
  // render
  const renderProductColors = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      className="block w-5 h-5 rounded-full cursor-pointer my-1"
    />
  ));
  // handler
  const OnEdit = () => {
    setProductToEdit(product);
    setIsOpenEdit(true);
    setProductIndex(index);
  };

  return (
    <div className="border rounded-md p-2 flex mx-auto flex-col max-w-sm md:max-w-lg">
      <Image className="rounded-md h-[300px]" alt={title} src={imageURL} />
      <h3 className="text-lg font-semibold">{textSlicer(title, 25)}</h3>
      <p className="text-xs text-gray-500 break-words">
        {textSlicer(description)}
      </p>
      {renderProductColors.length > 0 ? (
        <div className="flex items-center my-4 space-x-3 flex-wrap">
          {renderProductColors}
        </div>
      ) : (
        <Available
          className="text-red-400 font-semibold text-sm"
          message="Not Available Colors!"
        />
      )}
      <div className="flex items-center justify-between mb-2">
        <span>${price}</span>
        <div className="flex items-center gap-2 ">
          <span className="font-semibold text-sm">{category.name}</span>
          <Image
            className="w-10 h-10 rounded-full object-fit-cover"
            alt={category.name}
            src={category.imageURL}
          />
        </div>
      </div>
      <div className="flex items-center justify-between space-x-2">
        <Button onClick={OnEdit} className="bg-indigo-700 w-full">
          edit{" "}
        </Button>
        <Button
          onClick={() => deleteProduct(index)}
          className="bg-red-700 w-full "
        >
          delete
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
