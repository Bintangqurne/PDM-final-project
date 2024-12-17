'use client'

import { useState } from 'react'
import { Dialog, DialogPanel, Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  BuildingStorefrontIcon ,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import Logout from './action/Logout'

const products  = [
  { name: 'Produk', description: 'Pilih produk yang ada inginkan', href: '/product', icon: BuildingStorefrontIcon  },
  { name: 'Menambahkan Produk', description: 'Melakukan Penambahan Produk', href: '/add', icon: CursorArrowRaysIcon },
  { name: 'Keamanan', description: 'Data pelanggan Anda akan aman dan terlindungi', href: '#', icon: FingerPrintIcon },
  { name: 'Integrasi', description: 'Hubungkan dengan alat pihak ketiga', href: '#', icon: SquaresPlusIcon },
  { name: 'Automasi', description: 'Bangun saluran strategis yang akan mengonversi', href: '#', icon: ArrowPathIcon },
];

const callsToAction  = [
  { name: 'Tonton demo', href: '#', icon: PlayCircleIcon },
  { name: 'Hubungi penjualan', href: '#', icon: PhoneIcon },
];

const company  = [
  { name: 'Tentang kami', href: '#', description: 'Pelajari lebih lanjut tentang nilai dan misi perusahaan kami untuk memberdayakan orang lain' },
  { name: 'Tim', href: '/team', description: 'Mencari kesempatan karir berikutnya? Lihat semua posisi terbuka kami' },
  {
    name: 'Testimoni',
    href: '/testimoni ',
    description: 'Melihat bagaimana orang orang luar biasa telah melakukan testimoni',
  },
  { name: 'Blog', href: '#', description: 'Baca pengumuman terbaru kami dan dapatkan perspektif dari tim kami' },
];

import Logo from "../assets/Logo PDM.jpg" 
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate();

  return (
    <header className="bg-white border border-solid mb-5">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 ">
        <div className="flex lg:flex-1">
          <a href="/product" className="-m-1.5 p-1.5">
            <span className="sr-only text-black font-bold text-4xl w-full">Your Company</span>
            <img alt="" src={Logo} className="h-[50px] w-[200px] relative" />
          </a>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Product
              <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                  >
                    <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
                    </div>
                    <div className="flex-auto">
                      <a href={item.href} className="block font-semibold text-gray-900">
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                {callsToAction.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                  >
                    <item.icon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                    {item.name}
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          
          <a onClick={() => navigate('/history')} className="text-sm font-semibold leading-6 text-gray-900">
            History
          </a>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Logout/>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 flex w-full flex-col justify-between overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="sticky bottom-0 grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50 text-center">
            {callsToAction.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="p-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-100"
              >
                {item.name}
              </a>
            ))}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
