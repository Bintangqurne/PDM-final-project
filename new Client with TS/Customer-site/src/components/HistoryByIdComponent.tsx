import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../config/instance";
import { HistoryById } from '../redux/type';

const HistoryByIdComponent = () => {
    const { id } = useParams<{ id: string }>(); // Mendapatkan ID dari URL
    const [data, setData] = useState<HistoryById | null>(null);

  // Fungsi untuk mengambil data edit
  async function fetchHistory() {
    try {
      const { data } = await axios({
        url: `/customer/history/${id}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setData(data); // Menyimpan data ke dalam state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchHistory();
  }, [id]); // Panggil fetchEdit saat id berubah

  if (!data) {
    return <div>Loading...</div>; // Menunggu data, bisa juga tambahkan loading state
  }
  
  console.log(data)

  return (
    <main className="bg-white px-4 pb-24 sm:px-6 sm:pt-10 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-3xl">
        <div className="max-w-xl">
          <h1 className="text-base font-medium text-sky-400">Terima Kasih telah Memesan!</h1>
          <p className="mt-2 text-4xl font-bold tracking-tight">Pesanan Sudah Selesai!</p>
          <p className="mt-2 text-base text-gray-500">Pesanan Telah Anda Terima.</p>
        </div>

        <section aria-labelledby="order-heading" className="mt-10 border-t border-gray-200">
          <h2 id="order-heading" className="sr-only">
            Pesanan Anda
          </h2>

          <h3 className="sr-only">Items</h3>
          {/* Pastikan data sudah tersedia dan dalam bentuk array */}
              <div key={data.id} className="flex space-x-6 border-b border-gray-200 py-10">
                <img
                  src={data.image}
                  alt="Hello"
                  className="h-20 w-20 flex-none rounded-lg bg-gray-100 object-cover object-center sm:h-40 sm:w-40"
                />
                <div className="flex flex-auto flex-col">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      <a>{data.name}</a>
                    </h4>
                    <p className="mt-2 text-sm text-gray-600">{data.description}</p>
                  </div>
                  <div className="mt-6 flex flex-1 items-end">
                    <dl className="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
                      <div className="flex">
                        <dt className="font-medium text-gray-900">Quantity</dt>
                        <dd className="ml-2 text-gray-700">{data.Order.quantity}</dd>
                      </div>
                      <div className="flex pl-4 sm:pl-6">
                        <dt className="font-medium text-gray-900">Price</dt>
                        <dd className="ml-2 text-gray-700">
                          {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                          }).format(data.price)}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>

          <div className="sm:ml-40 sm:pl-6">
            <h3 className="sr-only">Your information</h3>

            <h4 className="sr-only">Addresses</h4>

            <h4 className="sr-only">Payment</h4>
            <dl className="grid grid-cols-2 gap-x-6 border-t border-gray-200 py-10 text-sm">
              <div>
                <dt className="font-medium text-gray-900">Pembayaran</dt>
                <dd className="mt-2 text-gray-700">
                  <p>Apple Pay</p>
                  <p>Mastercard</p>
                  <p>
                    <span aria-hidden="true">••••</span>
                    <span className="sr-only">Ending in </span>1545
                  </p>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">Pembelian Dilakukan</dt>
                <dd className="mt-2 text-gray-700">
                  <p>{data.orderType}</p>
                </dd>
              </div>
            </dl>

            <h3 className="sr-only">Summary</h3>

            <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Total</dt>
                <dd className="text-gray-900">
                          {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                          }).format(data.Order.totalPrice)}
                        </dd>
              </div>
            </dl>
          </div>
        </section>
      </div>
    </main>
  );
};

export default HistoryByIdComponent;
