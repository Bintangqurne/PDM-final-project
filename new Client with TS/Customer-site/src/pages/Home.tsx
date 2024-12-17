'use client'

import Nasi_Goreng from "../assets/Nasi_Goreng.jpg"
import Mie from "../assets/Mie.jpg"
import Tea from "../assets/Tea.jpg"
import Jeruk from "../assets/Jeruk.jpg"
import Soto_Betawi from "../assets/Soto_Betawi.jpg"
import Ayam from "../assets/Ayam.jpg"
import Sayur from "../assets/Sayur.jpg"
import Soto from "../assets/Soto.jpg"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { motion } from 'framer-motion';


const favorites = [
  {
    id: 1,
    name: 'Paket 1',
    price: 20000,
    href: '/product/5',
    imageSrc: Soto_Betawi,
    imageAlt: "Soto Betawi",
  },
  {
    id: 2,
    name: 'Nasi Goreng',
    price: 20000,
    href: '/product/1',
    imageSrc: Nasi_Goreng,
    imageAlt: "Nasi Goreng",
  },
  {
    id: 3,
    name: 'Mie Ayam',
    price: 15000,
    href: '/product/2',
    imageSrc: Mie,
    imageAlt:
      "Mie Coy enak",
  },
]


export default function Home() {

  return (
    <div className="bg-white">
      <Navbar/>
      {/* Mobile menu */}
      <header className="relative overflow-hidden">
      {/* Hero section */}
      <div
        className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40"
      >
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <motion.div className="sm:max-w-lg"
          initial={{opacity: 0, translateX: "-100%"}}
          whileInView={{opacity: 1, translateX: 0}}
          transition={{duration: 1.5}}
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Gaya Musim Panas Akhirnya Hadir
            </h1>
            <p className="mt-4 text-xl text-gray-500">
                Tahun ini, koleksi musim panas baru kami akan memanjakan Anda dengan cita rasa yang menyegarkan di setiap hidangan.
            </p>
            <div className="pt-10">
            <a
                href="/product"
                className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
              >
                Koleksi Resto
              </a>
            </div>
          </motion.div>
          <div className="">
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/1.5 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <motion.div 
                    initial={{opacity: 0, translateX: "100%"}}
                    whileInView={{opacity: 1, translateX: 0}}
                    transition={{duration: 1.5}} className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          alt=""
                          src={Nasi_Goreng}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src={Soto_Betawi}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src={Ayam}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src={Tea}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src={Mie}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src={Sayur}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src={Jeruk}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

      <main>
        {/* Category section */}
        

        {/* Featured section */}
        <motion.section 
        initial={{opacity: 0, rotateX: "90deg"}}
        whileInView={{opacity: 1, rotateX: 0}}
        transition={{duration: 2}}
        className="pt-10"
      >
          <div className="relative bg-gray-800 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
            <div className="absolute inset-0 overflow-hidden">
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-gray-900 bg-opacity-50" />
            <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 id="cause-heading" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Pemikiran Jangka Panjang
            </h2>
            <p className="mt-3 text-xl text-white">
              Kami berkomitmen untuk menyajikan hidangan lezat dan berkualitas tinggi dengan pendekatan yang bertanggung jawab 
              dan berkelanjutan. Setiap hidangan disiapkan dengan perhatian penuh untuk menjaga cita rasa serta meminimalkan dampak terhadap lingkungan.
            </p>
              <a
                  href="#"
                  className="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
              >
                  Baca cerita kami
              </a>
            </div>
          </div>
        </motion.section>

        {/* Favorites section */}
        <motion.section 
          initial={{ opacity: 0, translateY: "50%" }}  // Elemen mulai dari bawah (translateY 100% artinya posisi bawah)
          whileInView={{ opacity: 1, translateY: 0 }}   // Ketika elemen berada di dalam tampilan, animasi ke posisi normal (translateY 0)
          transition={{ duration: 1.5 }}
          aria-labelledby="favorites-heading">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="sm:flex sm:items-baseline sm:justify-between">
              <h2 id="favorites-heading" className="text-2xl font-bold tracking-tight text-gray-900">
                Favorit Kami
              </h2>
              <a href="/product" className="hidden text-sm font-semibold text-green-600 hover:text-green-500 sm:block">
                Cari semua favorit
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 lg:gap-x-8">
              {favorites.map((favorite) => (
                <div key={favorite.id} className="group relative">
                  <div className="h-96 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2 group-hover:opacity-75 sm:h-auto">
                    <img
                      alt={favorite.imageAlt}
                      src={favorite.imageSrc}
                      className="h-[220px] w-full object-cover object-center rounded-lg"
                    />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-gray-900">
                    <a href={favorite.href}>
                      <span className="absolute inset-0" />
                      {favorite.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(favorite.price)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 sm:hidden">
              <a href="#" className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                Browse all favorites
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </motion.section>

        {/* CTA section */}
        <motion.section 
          initial={{ opacity: 0, translateY: "50%" }}  // Elemen mulai dari bawah (translateY 100% artinya posisi bawah)
          whileInView={{ opacity: 1, translateY: 0 }}   // Ketika elemen berada di dalam tampilan, animasi ke posisi normal (translateY 0)
          transition={{ duration: 2 }} aria-labelledby="sale-heading">
          <div className="overflow-hidden pt-32 sm:pt-14">
            <div className="bg-gray-800">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative pb-16 pt-48 sm:pb-24">
                  <div>
                    <h2 id="sale-heading" className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                      Penawaran Terbaik kami
                      <br />
                      Up to 10% off.
                    </h2>
                    <div className="mt-6 text-base">
                      <a href="/product" className="font-semibold text-white">
                        Belanja ke Toko
                        <span aria-hidden="true"> &rarr;</span>
                      </a>
                    </div>
                  </div>

                  <div className="absolute -top-32 left-1/2 -translate-x-1/2 transform sm:top-6 sm:translate-x-0">
                    <div className="ml-24 flex min-w-max space-x-6 sm:ml-3 lg:space-x-8">
                      <div className="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                        <div className="flex-shrink-0">
                          <img
                            alt=""
                            src={Nasi_Goreng}
                            className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                          />
                        </div>

                        <div className="mt-6 flex-shrink-0 sm:mt-0">
                          <img
                            alt=""
                            src={Mie}
                            className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-6 sm:-mt-20 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                        <div className="flex-shrink-0">
                          <img
                            alt=""
                            src={Ayam}
                            className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                          />
                        </div>

                        <div className="mt-6 flex-shrink-0 sm:mt-0">
                          <img
                            alt=""
                            src={Jeruk}
                            className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                        <div className="flex-shrink-0">
                          <img
                            alt=""
                            src={Soto}
                            className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                          />
                        </div>

                        <div className="mt-6 flex-shrink-0 sm:mt-0">
                          <img
                            alt=""
                            src={Soto_Betawi}
                            className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
      <Footer/>
    </div>
  )
}
