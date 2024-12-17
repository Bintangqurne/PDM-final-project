import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { motion } from "framer-motion";

const featuredTestimonial = {
  body: 'Makanan yang disajikan sangat lezat dan penyajiannya sangat menarik. Suasana restoran yang nyaman membuat pengalaman makan menjadi lebih menyenangkan. Kami pasti akan kembali lagi!',
  author: {
    name: 'Reyhan',
    handle: 'Reyhan_GG',
    imageUrl:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80',
    logoUrl: 'https://tailwindui.com/img/logos/savvycal-logo-gray-900.svg',
  },
}

const testimonials = [
  [
    [
      {
        id: 1,
        body: 'Makanan di restoran ini luar biasa! Rasa masakannya sangat otentik dan selalu segar. Pelayanan juga sangat ramah dan cepat.',
        author: {
          name: 'Budi Santoso',
          handle: 'Budi_ss',
          imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
    ],
    [
      {
        id: 2,
        body: 'Tempat yang sangat bagus untuk makan bersama keluarga. Menu yang variatif dan rasa yang selalu memuaskan. Sangat direkomendasikan!',
        author: {
          name: 'Teddyboy',
          handle: 'Ted_',
          imageUrl:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
    ],
  ],
  [
    [
      {
        id: 3,
        body: 'Makanan disini selalu memiliki cita rasa yang unik dan berbeda. Tempatnya juga sangat nyaman untuk bersantai sambil menikmati hidangan.',
        author: {
          name: 'Singamaraja',
          handle: 'SINNN_',
          imageUrl:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
    ],
    [
      {
        id: 4,
        body: 'Pengalaman makan yang luar biasa! Restoran ini memiliki suasana yang nyaman dan makanan yang tidak pernah mengecewakan.',
        author: {
          name: 'Adriel',
          handle: 'Addrriieeell',
          imageUrl:
            'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
    ],
  ],
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Testimoni() {
  return (
    <>
      <Navbar />
      <div className="relative isolate bg-white pb-10 pt-24 sm:pt-10">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] xl:ml-0 xl:mr-[calc(50%-12rem)]"
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
          initial={{ opacity: 0, translateY: "-50%" }}  // Elemen mulai dari bawah (translateY 100% artinya posisi bawah)
          whileInView={{ opacity: 1, translateY: 0 }}   // Ketika elemen berada di dalam tampilan, animasi ke posisi normal (translateY 0)
          transition={{ duration: 2 }}
          className="mx-auto max-w-xl text-center">
            <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">Testimoni</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Kami telah melayani ribuan pelanggan luar biasa
            </p>
          </motion.div>
          <motion.div 
          
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
            <motion.figure 
            initial={{ opacity: 0, translateY: "-100%" }}  // Elemen mulai dari bawah (translateY 100% artinya posisi bawah)
            whileInView={{ opacity: 1, translateY: 0 }}   // Ketika elemen berada di dalam tampilan, animasi ke posisi normal (translateY 0)
            transition={{ duration: 2 }}
            className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 sm:col-span-2 xl:col-start-2 xl:row-end-1">
              <div>
                <blockquote className="p-6 text-lg font-semibold leading-7 tracking-tight text-gray-900 sm:p-12 sm:text-xl sm:leading-8">
                <p>{`“${featuredTestimonial.body}”`}</p>
              </blockquote>
              <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-gray-900/10 px-6 py-4 sm:flex-nowrap">
                <img
                  alt=""
                  src={featuredTestimonial.author.imageUrl}
                  className="h-10 w-10 flex-none rounded-full bg-gray-50"
                />
                <div className="flex-auto">
                  <div className="font-semibold">{featuredTestimonial.author.name}</div>
                  <div className="text-gray-600">{`@${featuredTestimonial.author.handle}`}</div>
                </div>
                <img alt="" src={featuredTestimonial.author.logoUrl} className="h-10 w-auto flex-none" />
              </figcaption>
              </div>
            </motion.figure>
            {testimonials.map((columnGroup, columnGroupIdx) => (
              <div
              key={columnGroupIdx} className="space-y-8 xl:contents xl:space-y-0">
                {columnGroup.map((column, columnIdx) => (
                  <motion.div
                  className={classNames(
                    (columnGroupIdx === 0 && columnIdx === 0) ||
                    (columnGroupIdx === testimonials.length - 1 && columnIdx === columnGroup.length - 1)
                      ? 'xl:row-span-2'
                      : 'xl:row-start-1',
                    'space-y-8',
                  )}
                >
                  {column.map((testimonial) => (
                  <motion.figure
                    key={testimonial.author.handle}
                    initial={{
                      opacity: 0,
                      translateX: 
                        column[0].id === 1 || column[0].id === 2 ? "-100%" : // Budi Santoso (0) dan Teddyboy (1) muncul dari kiri
                        column[0].id === 3 || column[0].id === 4 ? "100%" : "0", // Singamaraja (2) dan Adriel (3) muncul dari kanan
                    }} 
                    whileInView={{ opacity: 1, translateX: 0 }}  // Saat berada dalam tampilan, animasi ke posisi semula (translateX: 0)
                    transition={{ duration: 2 }}
                    className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
                  >
                    <blockquote className="text-gray-900">
                      <p>{`“${testimonial.body}”`}</p>
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-x-4">
                      <img alt="" src={testimonial.author.imageUrl} className="h-10 w-10 rounded-full bg-gray-50" />
                      <div>
                        <div className="font-semibold">{testimonial.author.name}</div>
                        <div className="text-gray-600">{`@${testimonial.author.handle}`}</div>
                      </div>
                    </figcaption>
                  </motion.figure>
                ))}
                </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  )
}
