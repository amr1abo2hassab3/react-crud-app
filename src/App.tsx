import ProductCard from "./Components/ProductCard/ProductCard";
import Button from "./Components/ui/Button";
import Modal from "./Components/ui/Modal";
import { productList } from "./data";
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
  // render
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
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
      </Modal>
    </main>
  );
};

export default App;
