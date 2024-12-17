import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ProductData } from '@/redux/type'
import axios from '../config/instance'
import Swal from 'sweetalert2'
import Nasi_Goreng from "../assets/Nasi_Goreng.jpg"
import Mie from "../assets/Mie.jpg"
import Tea from "../assets/Tea.jpg"
import Jeruk from "../assets/Jeruk.jpg"
import Soto_Betawi from "../assets/Soto_Betawi.jpg"
import Ayam from "../assets/Ayam.jpg"
import Sayur from "../assets/Sayur.jpg"
import Soto from "../assets/Soto.jpg"

import {
  TabGroup, TabList, TabPanel, TabPanels, Tab,
} from '@headlessui/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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

export default function ProductById() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [data, setData] = useState<ProductData | null>(null)
  const [add, setAdd] = useState({
    quantity: 1,
    tableId: "",
    orderType: "Dine-In", // Default order type
  })
  const [progress, setProgress] = useState(13)

  async function fetchProduct() {
    try {
      const response = await axios({
        url: `/customer/product/${id}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      setData(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [id])

  useEffect(() => {
    const timer = setTimeout(() => setProgress(30), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleAddOrder = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // Show SweetAlert confirmation
    const result = await Swal.fire({
      title: 'Apakah kamu yakin?',
      text: 'Apakah kamu ingin melanjutkan pembayaran?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Iya, saya yakin',
      cancelButtonText: 'Tidak, saya ingin kembali',
    });

    if (result.isConfirmed) {
      // Show success message
      await Swal.fire({
        title: 'Berhasil!',
        text: 'Pesanan kamu akan di proses segera.',
        icon: 'success',
      });

      try {
        // Make the API request to add the order
          await axios.post(
          `/customer/history/${id}`, 
          {
            name: data?.name, 
            description: data?.description, 
            price: data?.price,
            // Memastikan data?.name valid untuk digunakan sebagai key di dataImage
            image: data?.name && dataImage[data?.name] ? dataImage[data?.name] : undefined,
            quantity: add.quantity, // Use quantity from add state
            tableId: add.orderType === "Dine-In" ? add.tableId : null, // Only include tableId if orderType is Dine-In
            orderType: add.orderType, // Send orderType
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        

        // Navigate to history page after successful order placement
        navigate("/history");
      } catch (error) {
        console.error("Error placing order:", error);
      }
    }
  }

  console.log(add.quantity, '<<<<<')

  return (
    <>
      <Navbar />
      <div className="bg-white">
        <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-20 py-20">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
              {/* Image gallery */}
              <TabGroup className="flex flex-col-reverse">
                <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                  <TabList className="grid grid-cols-4 gap-6">
                    {data?.image && (
                      <Tab
                        key={data?.image}
                        className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                      >
                        <span className="sr-only">{data?.image}</span>
                        <span className="absolute inset-0 overflow-hidden rounded-md">
                          <img alt={data?.image} src={dataImage[data.name]} className="h-full w-full object-cover object-center" />
                        </span>
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 rounded-lg ring-2 ring-transparent ring-offset-1 group-data-[selected]:ring-green-500"
                        />
                      </Tab>
                    )}
                  </TabList>
                </div>

                <TabPanels className="aspect-h-1 aspect-w-1 w-full">
                  {data?.image && (
                    <TabPanel key={data?.image}>
                      <img
                        alt={data?.image}
                        src={dataImage[data.name]}
                        className="h-[400px] w-[700px] object-cover object-center sm:rounded-xl "
                      />
                    </TabPanel>
                  )}
                </TabPanels>
              </TabGroup>

              {/* Product info */}
              <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">{data?.name}</h1>
                  <div className="flex justify-between w-[310px]">
                    <span className='font-sans text-gray-500'>Deskripsi:</span>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.description ?? '',
                      }}
                      className="space-y-6 text-base text-gray-700"
                    />
                  </div>
                  <div className="mt-2 font-sans border-b-2 border-gray-100 w-[325px] pb-4"> {/* Added padding-bottom for space */}
                    <h1 className="text-black font-bold text-3xl"> {/* Adjust text size here */}
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                      }).format(data?.price ?? 0)}
                    </h1>
                  </div>
                <form className="mt-6">
                
                <div className="flex justify-between w-[290px] gap-x-10 items-center mb-5">
                  <select
                    id="orderType"
                    name="orderType"
                    value={add.orderType}
                    onChange={(e) => setAdd({ ...add, orderType: e.target.value })}
                    className="mt-2 block w-[150px] h-[40px] p-2 border border-green-600 rounded-[4px] focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="Dine-In" className="text-white bg-green-500 hover:bg-green-200">Dine-In</option>
                    <option value="Pick-Up" className="text-white bg-green-500 hover:bg-green-200">Pick-Up</option>
                  </select>
                  {add.orderType === "Dine-In" && (
                      <div className="">
                        <select
                          id="tableId"
                          name="tableId"
                          value={add.tableId}
                          onChange={(e) => setAdd({ ...add, tableId: e.target.value })}
                          className="mt-2 block w-[150px] h-[40px] p-2 border border-green-600 rounded-[4px]"
                        >
                          {/* Generate options from 1 to 20 */}
                          {[...Array(20)].map((_, index) => {
                            const tableNumber = index + 1;
                            return (
                              <option key={tableNumber} value={tableNumber}>
                                Meja {tableNumber}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    )}
                </div>
                    <div className="flex items-center space-x-4 mb-6 w-[300px]">
                <div className="flex items-center rounded-[5px] border-solid border-2 border-green-600 h-[40px]">
                    {/* Minus Button */}
                    <button
                      type="button"
                      onClick={() => setAdd({ ...add, quantity: Math.max(add.quantity - 1, 1) })}
                      className={`flex justify-center text-lg font-semibold ml-2 w-[25px] h-[30px] focus:outline-none rounded-[5px] ${
                        add.quantity === 1
                          ? 'text-gray-500 bg-white-100 cursor-not-allowed'  // Block the button when quantity is at minimum (1)
                          : 'text-green-600 hover:bg-gray-300'  // Default behavior when quantity is greater than 1
                      }`}
                      disabled={add.quantity === 1}  // Disable the button when quantity is 1
                    >
                      -
                    </button>
                    {/* Input Field */}
                    <input
                      min="1"
                      value={add.quantity}
                      onChange={(e) => setAdd({ ...add, quantity: Math.max(1, parseInt(e.target.value)) })}
                      className="w-20 h-[30px] text-center sm:text-sm border-none focus:outline-none focus:border-none"
                    />

                    {/* Plus Button */}
                    <button
                      type="button"
                      onClick={() => setAdd({ ...add, quantity: Math.min(add.quantity + 1, data?.amount ?? 0) })}
                      className={`flex justify-center text-lg font-semibold mr-2 w-[25px] h-[30px] focus:outline-none rounded-[5px] ${
                        add.quantity === (data?.amount ?? 0)
                          ? 'text-gray-500 bg-white-100 cursor-not-allowed'  // Block cursor and make it look disabled
                          : 'text-green-600 hover:bg-gray-300'  // Default behavior when there's still stock available
                      }`}
                      disabled={add.quantity === (data?.amount ?? 0)}  // Disable the button functionality
                    >
                      +
                    </button>

                  </div>
                  <div className="flex justify-between w-[1000px]">
                    {data?.amount !== undefined && data.amount < 10 ? (
                      <>
                        <span className="">Stok Total:</span>
                        <span className="text-red-600 font-bold">Sisa {data.amount}</span>
                      </>
                    ) : (
                      <>
                        <span className="">Stok Total:</span>
                        <span className=" font-bold">{data?.amount ?? "N/A"}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex justify-between w-[300px]">
                  <span className="items-center text-center flex justify-center text-[20px] font-semibold text-gray-300">Sub Total: </span>
                  <h1 className="font-bold text-[30px]">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    }).format(
                      ((add?.quantity ?? 0)) * (data?.price ?? 0)
                    )}
                  </h1>
                </div>
                  <div className="mt-10 flex">
                    <button
                      onClick={handleAddOrder}
                      type="submit"
                      className="flex max-w-xs flex-1 items-center justify-center rounded-[5px] border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                    >
                      Beli
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
