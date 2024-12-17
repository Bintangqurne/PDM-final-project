import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/instance";
import { BiImage, BiPaperPlane, BiUser } from "react-icons/bi";

const IsiAdd: React.FC = () => {
  const navigate = useNavigate();
  const [add, setAdd] = useState({
    name: "",
    description: "",
    price: 0,
    amount: 0,
    image: "",
    categoryId: 0, // Menyimpan id kategori berdasarkan pilihan
  });

  // Fungsi untuk menangani submit
  const submitHandler = async (event: React.FormEvent) => {
    try {
      event.preventDefault();

      // Mengirim data ke API
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

      // Setelah berhasil menambahkan produk, arahkan ke halaman produk
      navigate("/product");
    } catch (error) {
      console.log(error);
    }
  };

  // Fungsi untuk menangani perubahan input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    // Jika kategori, kita ubah nilainya ke ID kategori yang sesuai
    if (name === "category") {
      if (value === "Makanan") {
        setAdd({ ...add, categoryId: 1 });
      } else if (value === "Minuman") {
        setAdd({ ...add, categoryId: 2 });
      } else if (value === "Paket") {
        setAdd({ ...add, categoryId: 3 });
      }
    } else {
      setAdd({ ...add, [name]: value });
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
           Add Product
          </h1>
          <form onSubmit={submitHandler}>
            {/* Input Name */}
            <div className="relative my-4">
              <input
                type="text"
                name="name"
                value={add.name}
                onChange={handleChange}
                style={{ width: "440px" }}
                className="block pt-3.5 pb-3 text-sm text-black bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
              />
              <label
                htmlFor="name"
                style={{ fontSize: "25px", fontFamily: "monospace" }}
                className={`absolute text-lg text-black duration-300 transform scale-75 top-3 left-0 origin-[0] 
                  ${add.name ? 'translate-y-[-1.5rem]' : 'peer-focus:translate-y-[-1.5rem]'} 
                  ${add.name ? 'scale-75' : 'peer-focus:scale-75'} 
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
                value={add.image}
                onChange={handleChange}
                style={{ width: "440px" }}
                className="block pt-3.5 pb-3 text-sm text-black bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
              />
              <BiImage className="absolute top-3 right-0 size-6" />
              <label
                htmlFor="image"
                style={{ fontSize: "25px", fontFamily: "monospace" }}
                className={`absolute text-lg text-black duration-300 transform scale-75 top-3 left-0 origin-[0] 
                  ${add.image ? 'translate-y-[-1.5rem]' : 'peer-focus:translate-y-[-1.5rem]'} 
                  ${add.image ? 'scale-75' : 'peer-focus:scale-75'} 
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
                value={add.description}
                onChange={handleChange}
                style={{ width: "440px" }}
                className="block pt-3.5 pb-3 text-sm text-black bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
              />
              <BiPaperPlane className="absolute top-3 right-0 size-6" />
              <label
                htmlFor="description"
                style={{ fontSize: "25px", fontFamily: "monospace" }}
                className={`absolute text-lg text-black duration-300 transform scale-75 top-3 left-0 origin-[0] 
                  ${add.description ? 'translate-y-[-1.5rem]' : 'peer-focus:translate-y-[-1.5rem]'} 
                  ${add.description ? 'scale-75' : 'peer-focus:scale-75'} 
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
                value={add.price || ""}  
                onChange={handleChange}
                style={{ width: "440px" }}
                className="block pt-3.5 pb-3 text-sm text-black bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
              />
              <label
                htmlFor="price"
                style={{ fontSize: "25px", fontFamily: "monospace" }}
                className={`absolute text-lg text-black duration-300 transform scale-75 top-3 left-0 origin-[0] 
                  ${add.price ? 'translate-y-[-1.5rem]' : 'peer-focus:translate-y-[-1.5rem]'} 
                  ${add.price ? 'scale-75' : 'peer-focus:scale-75'} 
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
                value={add.amount || ""}  
                onChange={handleChange}
                style={{ width: "440px" }}
                className="block pt-3.5 pb-3 text-sm text-black bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
              />
              <label
                htmlFor="amount"
                style={{ fontSize: "25px", fontFamily: "monospace" }}
                className={`absolute text-lg text-black duration-300 transform scale-75 top-3 left-0 origin-[0] 
                  ${add.amount ? 'translate-y-[-1.5rem]' : 'peer-focus:translate-y-[-1.5rem]'} 
                  ${add.amount ? 'scale-75' : 'peer-focus:scale-75'} 
                  peer-focus:text-blue-600 peer-placeholder-shown:translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-grey-400`}
              >
                Amount
              </label>
            </div>

            {/* Input Category */}
            <div className="relative my-4">
            <select
              name="category"
              value={add.categoryId === 1 ? "Makanan" : add.categoryId === 2 ? "Minuman" : add.categoryId === 3 ? "Paket" : ""}
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
                  ${add.categoryId ? 'translate-y-[-1.5rem]' : 'peer-focus:translate-y-[-1.5rem]'} 
                  ${add.categoryId ? 'scale-75' : 'peer-focus:scale-75'} 
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
              ADD
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default IsiAdd;
