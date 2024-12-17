
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { EllipsisVerticalIcon} from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { useEffect } from 'react'
import { fetchHistory } from '@/redux/appSlice'
import { useNavigate } from 'react-router-dom'
import {  DataHistory } from '@/redux/type'


const orders = [
  {
    number: 'WU88191111',
    href: '#',
    invoiceHref: '#',
    createdDate: 'Jul 6, 2021',
    createdDatetime: '2021-07-06',
    deliveredDate: 'July 12, 2021',
    deliveredDatetime: '2021-07-12',
    total: '$160.00',
    products: [
      {
        id: 1,
        name: 'Micro Backpack',
        description:
          'Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.',
        href: '#',
        price: '$70.00',
        imageSrc: 'https://wallpaperaccess.com/full/2175101.jpg',
        imageAlt:
          'Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.',
      },
      // More products...
    ],
  },
  // More orders...
]
export default function HistoryComponent() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const {history, status, error} = useSelector((state: RootState) => state.appReducer);
  const dataHistory = history?.data
  
  
  useEffect(() => {
    dispatch(fetchHistory())
  }, [dispatch])
  console.log(dataHistory)
  
  return (
    <div className="bg-gray-50">
      
      <main className="py-14">
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Riwayat Pesanan</h1>
            <p className="mt-2 text-sm text-gray-500">
              Periksa status pesanan terbaru, kelola pengembalian, dan temukan produk serupa.
            </p>
          </div>
        </div>

        <section aria-labelledby="recent-heading" className="mt-16">
          <h2 id="recent-heading" className="sr-only">
            Pesanan Terbaru
          </h2>
          <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
            <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
            {dataHistory.length > 0 ? (
                dataHistory.map((history: DataHistory) => (
                  <div
                  key={history.id}
                  className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
                >
                  <h3 className="sr-only">
                    Pesanan dibuat pada <time dateTime={history.createdAt}>
                    {new Date(history.createdAt).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                  </h3>

                  <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
                    <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                      <div>
                        <dt className="font-medium text-gray-900">Nomor Pesanan</dt>
                        <dd className="mt-1 text-gray-500">{history.id}</dd>
                      </div>
                      <div className="hidden sm:block">
                        <dt className="font-medium text-gray-900">Tanggal Dibuat</dt>
                        <dd className="mt-1 text-gray-500">
                          <time dateTime={history.createdAt}>
                            {new Date(history.createdAt).toLocaleDateString('id-ID', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </time>
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900">Jumlah</dt>
                        <dd className="mt-1 font-medium text-gray-900">{history.Order.quantity}</dd>
                      </div>
                    </dl>

                    <Menu as="div" className="relative flex justify-end lg:hidden">
                      <div className="flex items-center">
                        <MenuButton className="-m-2 flex items-center p-2 text-gray-400 hover:text-gray-500">
                          <span className="sr-only">Opsi untuk pesanan {history.id}</span>
                          <EllipsisVerticalIcon aria-hidden="true" className="h-6 w-6" />
                        </MenuButton>
                      </div>

                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-40 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        <div className="py-1">
                          <MenuItem>
                            <a
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            >
                              Lihat
                            </a>
                          </MenuItem>
                          <MenuItem>
                            <a
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                              >
                              Faktur
                            </a>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Menu>

                    <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                      <Button
                        className="flex items-center justify-center rounded-[5px] border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        onClick={() => navigate(`/history/${history.orderId}`)}
                      >
                        <span>Lihat Pesanan</span>
                      </Button>
                    </div>
                  </div>

                  {/* Produk */}
                  <h4 className="sr-only">Barang</h4>
                  <ul role="list" className="divide-y divide-gray-200">
                      <li key={history.id} className="p-4 sm:p-6">
                        <div className="flex items-center sm:items-start">
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
                            <img
                              src={history.image}
                              className="h-full w-full object-cover object-center"
                              />
                          </div>
                          <div className="ml-6 flex-1 text-sm">
                          <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                            <h5>{history.name}</h5>
                            <p className="mt-2 sm:mt-0">
                              {new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                              }).format(history.price)}
                            </p>
                          </div>
                            <p className="hidden text-gray-500 sm:mt-2 sm:block">{history.description}</p>
                          </div>
                        </div>

                        <div className="mt-6 sm:flex sm:justify-between">
                          <div className="flex items-center">
                            <CheckCircleIcon aria-hidden="true" className="h-5 w-5 text-green-500" />
                            <p className="ml-2 text-sm font-medium text-gray-500">
                              Dikirim pada <time dateTime={history.createdAt}>
                                {new Date(history.createdAt).toLocaleDateString('id-ID', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </time>
                            </p>
                          </div>

                          <div className="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-0">
                            <div className="flex flex-1 justify-center">
                              <button
                              onClick={() => navigate(`/product/${history.productId}`)}
                                className="whitespace-nowrap text-sky-600 hover:text-sky-500"
                              >
                                Lihat produk
                              </button>
                            </div>
                            <div className="flex flex-1 justify-center pl-4">
                              <a href="#" className="whitespace-nowrap text-sky-600 hover:text-sky-500">
                                Beli lagi
                              </a>
                            </div>
                          </div>
                        </div>
                      </li>
                  </ul>
                </div>
                ))
              ) : (
                <p>Tidak ada data tersedia</p> // Jika dataHistory kosong
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
