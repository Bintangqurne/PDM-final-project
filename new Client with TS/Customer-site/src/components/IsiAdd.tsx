import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/instance";

const IsiAdd: React.FC = () => {
  const navigate = useNavigate();
  const [add, setAdd] = useState({
    name: "",
    description: "",
    price: 0,
    amount: 0,
    image: "",
    categoryId: 0,
  });

  const submitHandler = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      const { data } = await axios.post(
        "/product",
        {
          name: add.name,
          description: add.description,
          price: add.price,
          amount: add.amount,
          image: add.image,
          categoryId: add.categoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      navigate("/product");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAdd({ ...add, [name]: value });
  };

  return (
    <div className="container">
      <h2>Add New Product</h2>
      <form onSubmit={submitHandler} className="form">
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={add.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={add.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={add.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={add.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={add.image}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="categoryId">Category ID</label>
          <input
            type="number"
            id="categoryId"
            name="categoryId"
            value={add.categoryId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default IsiAdd;
