import ProductCard from "./Components/ProductCard/ProductCard";
import Button from "./Components/ui/Button";
import Input from "./Components/ui/Input";
import Modal from "./Components/ui/Modal";
import { colors, formInputsList, productList } from "./data";
import { useState, type ChangeEvent, type FormEvent } from "react";
import type { IProduct } from "./interfaces";
import { productValidation, type IproductValidation } from "./validation";
import ErrorMessage from "./Components/ui/ErrorMessage";
import CircleColor from "./Components/ui/CircleColor";

const App = () => {
  const defaultProductObj: IProduct = {
    title: "",
    description: "",
    price: "",
    imageURL: "",
    colors: [] as string[],
    category: {
      name: "",
      imageURL: "",
    },
  };

  // <<<<<<<<<<<  state >>>>>>>>>>>>
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tempColors, setTempColors] = useState<string[]>([] as string[]);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [errors, setErrors] = useState<IproductValidation>({
    title: "",
    description: "",
    price: "",
    imageURL: "",
  });

  // <<<<<<<<<<<  handler >>>>>>>>>>>>
  function openModal(): void {
    setIsOpen(true);
  }
  function closeModal(): void {
    setIsOpen(false);
    setProduct(defaultProductObj);
  }
  // this function hadler change input
  function onChangeHandler(e: ChangeEvent<HTMLInputElement>): void {
    const { value, name } = e.target;
    setProduct({ ...product, [name]: value });
    setErrors({
      ...errors,
      [name]: "",
    });
  }
  // function handler validation data in input
  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const errorsReturned = productValidation({
      title: product.title,
      price: product.price,
      description: product.description,
      imageURL: product.imageURL,
    });
    const hasErrors = Object.values(errorsReturned).some((error) => error);

    if (hasErrors) {
      setErrors(errorsReturned);
      return;
    }
  }
  // this function add colors of product in array Tempcolor
  function addColor(color: string) {
    // handle if color include in state it will remove
    if (tempColors.includes(color)) {
      const newColors: string[] = tempColors.filter(
        (item: string) => item !== color
      );
      setTempColors(newColors);
    } else {
      setTempColors((prev) => [...prev, color]);
    }
  }
  console.log(tempColors);

  // <<<<<<<<<<<  render >>>>>>>>>>>>
  // render product in user interface
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  // render form input add new product
  const renderFormInputsList = formInputsList.map((input) => (
    <div key={input.id} className="flex flex-col">
      <label
        className="mb-[2px] text-sm font-medium text-gray-700"
        htmlFor={input.id}
      >
        {input.label}
      </label>
      <Input
        className="border-[1px] border-gray-300 shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-lg px-3 py-3 text-md"
        type={input.type}
        name={input.name}
        id={input.id}
        onChange={onChangeHandler}
        value={product[input.name]}
      />
      <ErrorMessage
        message={errors[input.name]}
        className="block text-red-600 font-semibold text-sm my-1"
      />
    </div>
  ));
  // render Product Colors
  const renderProductColors = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      className="block w-5 h-5 rounded-full cursor-pointer my-1"
      onClick={() => {
        addColor(color);
      }}
    />
  ));
  const renderTempColors = tempColors.map((color: string) => (
    <span
      key={color}
      className="text-white rounded"
      style={{ backgroundColor: color }}
    >
      {color}
    </span>
  ));
  return (
    <main className="container mx-auto m-5 p-2">
      {/* Button open modal */}
      <Button className="bg-indigo-700 w-1/4" onClick={openModal}>
        Add
      </Button>
      {/* render Data in user interface */}
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProductList}
      </div>
      {/* componet modal reusable  */}
      <Modal isOpen={isOpen} closeModal={closeModal} title="ADD NEW PRODUCT ">
        <form className="space-y-3" onSubmit={handleSubmit}>
          {renderFormInputsList}
          <div className="flex items-center my-4 space-x-2 flex-wrap">
            {renderProductColors}
          </div>
          <div className="flex items-center my-4 space-x-2 flex-wrap">
            {renderTempColors}
          </div>
          <div className="flex items-center space-x-2">
            <Button className="bg-indigo-500 w-full  hover:bg-indigo-700 transition-all">
              Submit{" "}
            </Button>
            <Button
              onClick={closeModal}
              className="bg-gray-500 w-full hover:bg-gray-700 transition-all "
            >
              Cancel
            </Button>
          </div>
        </form>{" "}
      </Modal>
    </main>
  );
};

export default App;
