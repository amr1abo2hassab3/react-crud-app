export
  interface IproductValidation{
    title: string;
    description: string;
    imageURL: string;
  price: string;
}
    
/**
 * Validates product data and returns error messages for invalid fields.
 * @param product - The product data to validate. {object}
 * @returns An object containing error messages for each invalid field.
 */
export const productValidation = (product:IproductValidation) => {
    const errors:IproductValidation = {
        title: "",
        description: "",
        price: "",
      imageURL: "",
    }
    const urlRegex = /^https?:\/\//;

    // title validation
    if (!product.title.trim()) {
        errors.title = "Title is required";
      } else if (product.title.length < 10) {
        errors.title = "Title must be at least 10 characters";
      } else if (product.title.length > 80) {
        errors.title = "Title must not exceed 80 characters";
    }
    // description validation
    if (!product.description.trim()) {
        errors.description = "description is required";
      } else if (product.description.length < 20) {
        errors.description = "description must be at least 20 characters";
      } else if (product.description.length > 900) {
        errors.description = "description must not exceed 900 characters";
    }
    // image url validation
    if (!product.imageURL.trim())
        errors.imageURL = "Image URL is required";
    else if (!urlRegex.test(product.imageURL)) {
        errors.imageURL = "Image URL is invalid";
    }
    // price validation 
    if (!product.price.trim()) {
        errors.price = "Price is required";
    }
    else if (!/^\d+(\.\d+)?$/.test(product.price)) {
        errors.price = "Price must be a valid number";
  }
  
 

    return errors;
}