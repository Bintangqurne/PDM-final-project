import { AppDispatch, RootState } from "@/redux/store";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../config/instance";
import { fetchProductById, fetchProduct } from "@/redux/appSlice";
  
const IsiEdit: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Mengambil produk dari state global
  const { product, status, error } = useSelector(
    (state: RootState) => state.appReducer
  );

  // State untuk form editing (menggunakan produk kosong pertama kali)
  const [edit, setEdit] = useState({
    name: '',
    description: '',
    price: 0,
    amount: 0,
    image: '',
    categoryId: 0,
  });
  

  // Pastikan produk diambil berdasarkan ID yang tepat
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(parseInt(id))); // Memanggil fetchProductById untuk mengambil data produk
    }
  }, [id, dispatch]);
  
  useEffect(() => {
    if (product) {
      setEdit(product); // Set produk ke state edit hanya jika produk ada
    }
  }, [product]);

  // Pastikan produk diambil terlebih dahulu sebelum render form
  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  // Jika edit masih null, maka form tidak ditampilkan
  if (!edit) return <p>No product data available</p>;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEdit({ ...edit, [name]: value });
  };

  const handlerEdit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { data } = await axios.patch(`/product/${id}`, edit, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(data);
      navigate("/product");
      dispatch(fetchProduct()); // Update daftar produk setelah perubahan
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handlerEdit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={edit.name} // Pastikan mengambil dari edit.name
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={edit.description} // Pastikan mengambil dari edit.description
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={edit.price} // Pastikan mengambil dari edit.price
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={edit.amount} // Pastikan mengambil dari edit.amount
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={edit.image} // Pastikan mengambil dari edit.image
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="categoryId">Category ID</label>
          <input
            type="number"
            id="categoryId"
            name="categoryId"
            value={edit.categoryId} // Pastikan mengambil dari edit.categoryId
            onChange={handleChange}
          />
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default IsiEdit;
