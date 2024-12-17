import { AppDispatch, RootState } from "@/redux/store";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../config/instance";
import { fetchProductById, fetchProduct } from "@/redux/appSlice";
import { BiImage, BiPaperPlane, BiUser } from "react-icons/bi";
  
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

    if (name === "category") {
      if (value === "Makanan") {
        setEdit({ ...edit, categoryId: 1 });
      } else if (value === "Minuman") {
        setEdit({ ...edit, categoryId: 2 });
      } else if (value === "Paket") {
        setEdit({ ...edit, categoryId: 3 });
      }
    } else {
      setEdit({ ...edit, [name]: value });
    }
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
      <>
        <div className="">
          <div className="rounded-md p-10 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative items-center">
            <h1
              className="text-4xl text-black font-bold text-center"
              style={{ fontFamily: "cursive" }}
            >
              Update Product
            </h1>
            <form onSubmit={handlerEdit}>
              {/* Input Name */}
              <div className="relative my-4">
                <input
                  type="text"
                  name="name"
                  value={edit.name}
                  onChange={handleChange}
                  style={{ width: "440px" }}
                  className="block pt-3.5 pb-3 text-sm text-black bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                />
                <label
                  htmlFor="name"
                  style={{ fontSize: "25px", fontFamily: "monospace" }}
                  className={`absolute text-lg text-black duration-300 transform scale-75 top-3 left-0 origin-[0] 
                    ${edit.name ? 'translate-y-[-1.5rem]' : 'peer-focus:translate-y-[-1.5rem]'} 
                    ${edit.name ? 'scale-75' : 'peer-focus:scale-75'} 
                    peer-focus:text-blue-600 peer-placeholder-shown:translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-grey-400`}
                >
                  Name
                </label>
              </div>
  
              {/* Input Image */}
              <div className="relative my-4">
                <input
                  type="text"
                  name="image"
                  value={edit.image}
                  onChange={handleChange}
                  style={{ width: "440px" }}
                  className="block pt-3.5 pb-3 text-sm text-black bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                />
                <label
                  htmlFor="image"
                  style={{ fontSize: "25px", fontFamily: "monospace" }}
                  className={`absolute text-lg text-black duration-300 transform scale-75 top-3 left-0 origin-[0] 
                    ${edit.image ? 'translate-y-[-1.5rem]' : 'peer-focus:translate-y-[-1.5rem]'} 
                    ${edit.image ? 'scale-75' : 'peer-focus:scale-75'} 
                    peer-focus:text-blue-600 peer-placeholder-shown:translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-grey-400`}
                >
                  Image URL
                </label>
              </div>
  
              {/* Input Description */}
              <div className="relative my-4">
                <input
                  type="text"
                  name="description"
                  value={edit.description}
                  onChange={handleChange}
                  style={{ width: "440px" }}
                  className="block pt-3.5 pb-3 text-sm text-black bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                />
                <label
                  htmlFor="description"
                  style={{ fontSize: "25px", fontFamily: "monospace" }}
                  className={`absolute text-lg text-black duration-300 transform scale-75 top-3 left-0 origin-[0] 
                    ${edit.description ? 'translate-y-[-1.5rem]' : 'peer-focus:translate-y-[-1.5rem]'} 
                    ${edit.description ? 'scale-75' : 'peer-focus:scale-75'} 
                    peer-focus:text-blue-600 peer-placeholder-shown:translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-grey-400`}
                >
                  Description
                </label>
              </div>
  
  
              {/* Input Price */}
              <div className="relative my-4">
                <input
                  type="number"
                  name="price"
                  value={edit.price || ""}  
                  onChange={handleChange}
                  style={{ width: "440px" }}
                  className="block pt-3.5 pb-3 text-sm text-black bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                />
                <label
                  htmlFor="price"
                  style={{ fontSize: "25px", fontFamily: "monospace" }}
                  className={`absolute text-lg text-black duration-300 transform scale-75 top-3 left-0 origin-[0] 
                    ${edit.price ? 'translate-y-[-1.5rem]' : 'peer-focus:translate-y-[-1.5rem]'} 
                    ${edit.price ? 'scale-75' : 'peer-focus:scale-75'} 
                    peer-focus:text-blue-600 peer-placeholder-shown:translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-grey-400`}
                >
                  Price
                </label>
              </div>
  
              {/* Input Amount */}
              <div className="relative my-4">
                <input
                  type="number"
                  name="amount"
                  value={edit.amount || ""}  
                  onChange={handleChange}
                  style={{ width: "440px" }}
                  className="block pt-3.5 pb-3 text-sm text-black bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                />
                <label
                  htmlFor="amount"
                  style={{ fontSize: "25px", fontFamily: "monospace" }}
                  className={`absolute text-lg text-black duration-300 transform scale-75 top-3 left-0 origin-[0] 
                    ${edit.amount ? 'translate-y-[-1.5rem]' : 'peer-focus:translate-y-[-1.5rem]'} 
                    ${edit.amount ? 'scale-75' : 'peer-focus:scale-75'} 
                    peer-focus:text-blue-600 peer-placeholder-shown:translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-grey-400`}
                >
                  Amount
                </label>
              </div>
  
              {/* Input Category */}
              <div className="relative my-4">
              <select
                name="category"
                value={edit.categoryId === 1 ? "Makanan" : edit.categoryId === 2 ? "Minuman" : edit.categoryId === 3 ? "Paket" : ""}
                onChange={handleChange}
                style={{ width: "440px" }}
                className="block pt-3.5 pb-3 text-sm text-black bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
              >
                <option value="" disabled hidden></option>
                <option value="Makanan">Makanan</option>
                <option value="Minuman">Minuman</option>
                <option value="Paket">Paket</option>
              </select>
  
                <label
                  htmlFor="category"
                  style={{ fontSize: "25px", fontFamily: "monospace" }}
                  className={`absolute text-lg text-black duration-300 transform scale-75 top-3 left-0 origin-[0] 
                    ${edit.categoryId ? 'translate-y-[-1.5rem]' : 'peer-focus:translate-y-[-1.5rem]'} 
                    ${edit.categoryId ? 'scale-75' : 'peer-focus:scale-75'} 
                    peer-focus:text-blue-600 peer-placeholder-shown:translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-grey-400`}
                >
                  Category
                </label>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                style={{ fontFamily: "monospace" }}
                className="w-full mb-4 text-[18px] mt-2 rounded-3xl bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 py-2 opacity-90"
              >
                edit
              </button>
            </form>
          </div>
        </div>
      </>
    );
};

export default IsiEdit;
