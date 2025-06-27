import ProductCard from "./Components/ProductCard/ProductCard";
import Button from "./Components/ui/Button";
import Input from "./Components/ui/Input";
import Modal from "./Components/ui/Modal";
import { formInputsList, productList } from "./data";
import { useState } from "react";

const App = () => {
  /* state   */
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // handler
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
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
      />
    </div>
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
        <form className="space-y-3">
          {renderFormInputsList}
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
