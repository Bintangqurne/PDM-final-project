import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { fetchProduct } from "@/redux/appSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { ProductData } from "@/redux/type";
import { Button } from "@headlessui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Nasi_Goreng from "../assets/Nasi_Goreng.jpg"
import Mie from "../assets/Mie.jpg"
import Tea from "../assets/Tea.jpg"
import Jeruk from "../assets/Jeruk.jpg"
import Soto_Betawi from "../assets/Soto_Betawi.jpg"
import Ayam from "../assets/Ayam.jpg"
import Sayur from "../assets/Sayur.jpg"
import Soto from "../assets/Soto.jpg"
import { motion } from "framer-motion";

// Menambahkan tipe untuk dataImage
const dataImage: Record<string, string> = {
  "Nasi Goreng": Nasi_Goreng,
  "Mie Ayam": Mie,
  "Es Teh Manis": Tea,
  "Jus Jeruk": Jeruk,
  "Paket 1 (nasi soto betawi + minum)": Soto_Betawi,
  "Paket 2 (nasi ayam goreng + sayur asem)": Ayam,
  "Sayur Asem": Sayur,
  "Soto Betawi": Soto,
};

export default function Product() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { product, status, error } = useSelector((state: RootState) => state.appReducer);
  const dataProduct = product;

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  console.log(dataProduct, '<<<<<');

  return (
    <>
      <Navbar />
      
      <div className="mx-auto max-w-2xl">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-[#6ce38c] to-[#89d8fc]"
          />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
          Makanan Minuman
        </h2>
      </div>

      <motion.section
        className=" p-6 rounded-lg shadow-lg"
      >
        <div className="py-10 px-36 grid grid-cols-3 gap-x-14 gap-y-10">
          {dataProduct.length > 0 ? (
            dataProduct.map((product: ProductData) => (
              <motion.div
                key={product.id}
                className="max-w-sm h-[450px] rounded overflow-hidden shadow-lg mb-4 cursor-pointer"
                initial={{ opacity: 0, translateY: "50%" }}  // Elemen mulai dari bawah (translateY 100% artinya posisi bawah)
                whileInView={{ opacity: 1, translateY: 0 }}   // Ketika elemen berada di dalam tampilan, animasi ke posisi normal (translateY 0)
                transition={{ duration: 2 }}
              >
                <a
                  onClick={() => navigate(`/product/${product.id}`)} // Menggunakan link untuk mengarahkan ke halaman produk
                  className="relative max-w-sm rounded overflow-hidden shadow-lg"
                >
                  <div className="m-5 mb-0 shadow-2xl">
                    <motion.img
                      className="w-[425px] h-[225px] rounded-xl"
                      src={dataImage[product.name]}
                      alt={product.name}
                      whileHover={{ scale: 1.1 }}  // Efek gambar membesar saat hover
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="px-6 py-4">
                    {product.amount < 10 ? (
                      <p className="font-bold text-red-500">Sisa {product.amount}</p>
                    ) : (
                      ""
                    )}
                    <div className="text-xl mb-2">{product.name}</div>
                    <p className="text-gray-700 text-base">{product.description}</p>
                    <dd className="font-bold">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(product.price)}
                    </dd>
                  </div>
                </a>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-lg text-gray-500">Produk tidak ditemukan.</p>
          )}
        </div>
      </motion.section>

      <Footer />
    </>
  );
}
