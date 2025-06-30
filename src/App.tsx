import ProductCard from "./Components/ProductCard/ProductCard";
import Button from "./Components/ui/Button";
import Input from "./Components/ui/Input";
import Modal from "./Components/ui/Modal";
import { categories, colors, formInputsList, productList } from "./data";
import { useState, type ChangeEvent, type FormEvent } from "react";
import type { IProduct } from "./interfaces";
import { productValidation, type IproductValidation } from "./validation";
import ErrorMessage from "./Components/ui/ErrorMessage";
import CircleColor from "./Components/ui/CircleColor";
import { v4 as uuid } from "uuid";
import Select from "./Components/ui/Select";
import type { InputNameType } from "./types";
import Available from "./Components/ui/Available";
import Swal from "sweetalert2";

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
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [tempColors, setTempColors] = useState<string[]>([] as string[]);
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [productToEdit, setProductToEdit] =
    useState<IProduct>(defaultProductObj);
  const [ProductIndex, setProductIndex] = useState<number>(0);
  const [selected, setSelected] = useState(categories[0]);
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
  function closeModalEdit(): void {
    setIsOpenEdit(false);
    // Reset the productToEdit state to its default value
    setProductToEdit(defaultProductObj);
    setErrors({
      title: "",
      description: "",
      price: "",
      imageURL: "",
    });
    setTempColors([] as string[]);
    setSelected(categories[0]);
  }
  function closeModal(): void {
    setIsOpen(false);
    setProduct(defaultProductObj);
    setErrors({
      title: "",
      description: "",
      price: "",
      imageURL: "",
    });
    setTempColors([] as string[]);
    setSelected(categories[0]);
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
  // this function hadler change input to edit
  function onChangeHandlerToEdit(e: ChangeEvent<HTMLInputElement>): void {
    const { value, name } = e.target;
    setProductToEdit({ ...productToEdit, [name]: value });
    setErrors({
      ...errors,
      [name]: "",
    });
  }
  // this function add colors of product in array Tempcolor
  function handleColor(color: string) {
    // handle if color include in state it will remove
    if (tempColors.includes(color)) {
      const newColors: string[] = tempColors.filter(
        (item: string) => item !== color
      );
      setTempColors(newColors);
      return;
    }
    if (productToEdit.colors.includes(color)) {
      const newColors: string[] = tempColors.filter(
        (item: string) => item !== color
      );
      setTempColors(newColors);
      return;
    }
    setTempColors((prev) => [...prev, color]);
  }
  // this function delete product in array
  function deleteProduct(index: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this! You want To delete this product",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const newProudct = [...products];
        newProudct.splice(index, 1);
        setProducts(newProudct);
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      }
    });
  }

  // function handler Edit product
  function handleEditSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const errorsReturned = productValidation({
      title: productToEdit.title,
      price: productToEdit.price,
      description: productToEdit.description,
      imageURL: productToEdit.imageURL,
    });
    const hasErrors = Object.values(errorsReturned).some((error) => error);

    if (hasErrors) {
      setErrors(errorsReturned);
      return;
    }

    // Create a shallow copy of the products array
    const productsUpdated = [...products];
    // Update a specific product in the array by its index
    productsUpdated[ProductIndex] = {
      ...productToEdit,
      colors: tempColors.concat(productToEdit.colors),
    };
    // Update the state with the new products array
    setProducts(productsUpdated);
    // close modal Edit
    closeModalEdit();
  }
  // function handler validation data in input and add new prodct
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

    setProducts((prev) => [
      { ...product, id: uuid(), colors: tempColors, category: selected },
      ...prev,
    ]);
    closeModal();
  }

  // <<<<<<<<<<<  render >>>>>>>>>>>>
  // render product in user interface
  const renderProductList = products.map((product, index: number) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      setIsOpenEdit={setIsOpenEdit}
      setProductIndex={setProductIndex}
      deleteProduct={deleteProduct}
      index={index}
    />
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
        handleColor(color);
      }}
    />
  ));
  // render temp colors
  const renderTempColors = tempColors.map((color: string) => (
    <span
      key={color}
      className="text-white rounded"
      style={{ backgroundColor: color }}
    >
      {color}
    </span>
  ));
  // function return input to edit
  const renderInputToEdit = (
    label: string,
    id: string,
    name: InputNameType
  ) => {
    return (
      <div className="flex flex-col">
        <label
          className="mb-[2px] text-sm font-medium text-gray-700"
          htmlFor={label}
        >
          {label}
        </label>
        <Input
          className="border-[1px] border-gray-300 shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-lg px-3 py-3 text-md"
          type={"text"}
          name={name}
          id={id}
          onChange={onChangeHandlerToEdit}
          value={productToEdit[name]}
        />
        <ErrorMessage
          message={errors[name]}
          className="block text-red-600 font-semibold text-sm my-1"
        />
      </div>
    );
  };

  return (
    <main className="container mx-auto  p-2">
      {/* Button open modal */}
      <Button className="bg-indigo-700 w-1/4 " onClick={openModal}>
        Add
      </Button>
      {/* render Data in user interface */}
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProductList.length > 0 ? (
          renderProductList
        ) : (
          <Available
            className="text-red-400 font-semibold text-xl"
            message="Not Available Products!"
          />
        )}
      </div>
      {/* Add Product modal reusable  */}
      <Modal isOpen={isOpen} closeModal={closeModal} title="ADD NEW PRODUCT ">
        <form className="space-y-3" onSubmit={handleSubmit}>
          {renderFormInputsList}
          <div className="flex items-center my-4 gap-1 flex-wrap">
            {renderProductColors}
          </div>
          <div className="flex items-center my-4 gap-1 flex-wrap">
            {renderTempColors}
          </div>
          <Select selected={selected} setSelected={setSelected} />
          <div className="flex items-center space-x-2">
            <Button className="bg-indigo-500 w-full  hover:bg-indigo-700 transition-all">
              Submit{" "}
            </Button>
            <Button
              onClick={closeModal}
              type="button"
              className="bg-gray-500 w-full hover:bg-gray-700 transition-all "
            >
              Cancel
            </Button>
          </div>
        </form>{" "}
      </Modal>
      {/* Edit Product modal   */}
      <Modal
        isOpen={isOpenEdit}
        closeModal={closeModalEdit}
        title="EDIT THIS PRODUCT "
      >
        <form className="space-y-3" onSubmit={handleEditSubmit}>
          {renderInputToEdit("Proudct Title", "title", "title")}
          {renderInputToEdit(
            "Proudct Description",
            "description",
            "description"
          )}
          {renderInputToEdit("Image Url", "imageURL", "imageURL")}
          {renderInputToEdit("Proudct Price", "price", "price")}
          <div className="flex items-center my-4 gap-1 flex-wrap">
            {renderProductColors}
          </div>
          <div className="flex items-center my-4 gap-1 flex-wrap ">
            {tempColors.concat(productToEdit.colors).map((color: string) => (
              <span
                onClick={() => {
                  handleColor(color);
                }}
                key={color}
                className="text-white rounded"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}{" "}
          </div>
          <Select
            selected={productToEdit.category}
            setSelected={(value) => {
              setProductToEdit({ ...productToEdit, category: value });
            }}
          />
          <div className="flex items-center space-x-2">
            <Button className="bg-indigo-500 w-full  hover:bg-indigo-700 transition-all">
              Submit{" "}
            </Button>
            <Button
              onClick={closeModalEdit}
              type="button"
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
