const footerNavigation = {
  products: [
    { name: 'Menu', href: '#' },
    { name: 'Spesial', href: '#' },
    { name: 'Minuman', href: '#' },
    { name: 'Dessert', href: '#' },
    { name: 'Pilihan Vegan', href: '#' },
  ],
  company: [
    { name: 'Tentang Kami', href: '#' },
    { name: 'Keberlanjutan', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Karir', href: '#' },
    { name: 'Syarat & Ketentuan', href: '#' },
    { name: 'Kebijakan Privasi', href: '#' },
  ],
  customerService: [
    { name: 'Hubungi Kami', href: '#' },
    { name: 'Reservasi', href: '#' },
    { name: 'Pesan Online', href: '#' },
    { name: 'Pengiriman', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Cari Lokasi', href: '#' },
  ],
}

export default function Footer() {
  return (
    <>
      <footer aria-labelledby="footer-heading" className="border-t border-gray-200 bg-white">
        <h2 id="footer-heading" className="sr-only">Footer</h2>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-20">
            <div className="grid grid-cols-1 md:grid-flow-col md:auto-rows-min md:grid-cols-12 md:gap-x-8 md:gap-y-16">
              {/* Bagian Gambar */}
              <div className="col-span-1 md:col-span-2 lg:col-start-1 lg:row-start-1">
                <img
                  alt=""
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </div>

              {/* Bagian Sitemap */}
              <div className="col-span-6 mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8 md:col-start-3 md:row-start-1 md:mt-0 lg:col-span-6 lg:col-start-2">
                <div className="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Menu</h3>
                    <ul role="list" className="mt-6 space-y-6">
                      {footerNavigation.products.map((item) => (
                        <li key={item.name} className="text-sm">
                          <a href={item.href} className="text-gray-500 hover:text-gray-600">
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Tentang Kami</h3>
                    <ul role="list" className="mt-6 space-y-6">
                      {footerNavigation.company.map((item) => (
                        <li key={item.name} className="text-sm">
                          <a href={item.href} className="text-gray-500 hover:text-gray-600">
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Layanan Pelanggan</h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {footerNavigation.customerService.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a href={item.href} className="text-gray-500 hover:text-gray-600">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bagian Newsletter */}
              <div className="mt-12 md:col-span-8 md:col-start-3 md:row-start-2 md:mt-0 lg:col-span-4 lg:col-start-9 lg:row-start-1">
                <h3 className="text-sm font-medium text-gray-900">Daftar untuk newsletter kami</h3>
                <p className="mt-6 text-sm text-gray-500">Penawaran dan diskon terbaru, dikirimkan langsung ke inbox Anda setiap minggu.</p>
                <form className="mt-2 flex sm:max-w-md">
                  <label htmlFor="email-address" className="sr-only">
                    Alamat email
                  </label>
                  <input
                    id="email-address"
                    type="text"
                    required
                    autoComplete="email"
                    className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <div className="ml-4 flex-shrink-0">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Daftar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 py-10 text-center">
            <p className="text-sm text-gray-500">&copy; 2021 Sobat Sobet, Inc. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
