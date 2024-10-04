import { useState } from "react";
import axios from "axios";

const category = [
  "Electronics",
  "Grocery",
  "Fashion",
  "Beauty",
  "Home",
  "Books",
  "Toys",
  "Sports",
  "Health",]

function AdminPage() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    category: "",
  });

  const [image, setImage] = useState(null); 

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Handle file input separately
  };

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/v1/product/createProducts",
        {
          name: product.name,
          description: product.description,
          price: product.price,
          discount: product.discount,
          category: product.category,
          image: image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        className="flex flex-col gap-10 bg-slate-400 p-20 w-4/5 shadow-2xl shadow-gray-900"
        onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5 text-xl">
          <label htmlFor="image">Upload Image : </label>
          <input
            type="file"
            name="image"
            value={product.image}
            onChange={handleImageChange}
          />
        </div>
        <div className="flex flex-col gap-5 text-xl">
          <label htmlFor="name">Name : </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={product.name}
            onChange={handleChange}
            className="w-3/4 p-2 text-lg text-center placeholder-orange-400 border-2 border-orange-600 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-5 text-xl">
          <label htmlFor="description">Description : </label>
          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            className="w-3/4 p-2 text-lg text-center placeholder-orange-400 border-2 border-orange-600 focus:outline-none"></textarea>
        </div>
        <div className="flex flex-col gap-5 text-xl">
          <label htmlFor="price">Price : </label>
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            className="w-3/4 p-2 text-lg text-center placeholder-orange-400 border-2 border-orange-600 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-5 text-xl">
          <label htmlFor="discount">Discount : </label>
          <input
            type="text"
            name="discount"
            placeholder="Discount"
            value={product.discount}
            onChange={handleChange}
            className="w-3/4 p-2 text-lg text-center placeholder-orange-400 border-2 border-orange-600 focus:outline-none"
          />
        </div>
        <div className="flex flex-col w-80 gap-5 text-xl">
          <label htmlFor="category">Select Category : </label>
          <select name="category" onChange={handleChange}>
            <option>----Select Category----</option>
            {category.map((res, index) => (
              <option key={index} value={res}>
                {res}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full text-center">
          <button
            className="w-80 bg-orange-700 pl-4 pr-4 p-2 hover:bg-orange-600"
            type="submit">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminPage;
