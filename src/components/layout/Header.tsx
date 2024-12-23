'use client'

import { fetchAllPages } from '@/api/api'
import {
  PopoverGroup
} from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import LanguageSwitcher from './LanguageSwitcher'
import { Page } from '@/lib/types'
import { useEffect, useState } from 'react'



export const Header = () => {
 const [Pages, setPages] = useState<Page[]>([]);
  useEffect(() => {
    const getPage = async () => {
      const response = await fetchAllPages();
      const page = response.data.Pages.map((p: Page) => p);
      return page;
    };
    const fetchPages = async () => {
      const page = await getPage();
      setPages(page);
    };
    fetchPages();
   
  }, []);
  
  return (
    <header className="" style={{backgroundColor: '#2ca34c', color: 'white'}}>
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image
              alt=""
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
              width={100}
              height={50}
            />
          </Link>
          <LanguageSwitcher />
        </div>
        <PopoverGroup className=" lg:flex lg:gap-x-12">
        {Pages.map((page: Page, index: number) => {
          return (
            <>
              <Link key={index} href={`/${page.Name}?lang=gb`} className="text-sm/6 font-semibold text-gray-100">
                {page.Name}
              </Link>
            </>
          );
        })}
        {/* <Link href="#" className="text-sm/6 font-semibold text-gray-100">
            Features
          </Link>

          <Link href="#" className="text-sm/6 font-semibold text-gray-100">
            Features
          </Link>
          <Link href="#" className="text-sm/6 font-semibold text-gray-100">
            Marketplace
          </Link>
          <Link href="#" className="text-sm/6 font-semibold text-gray-100">
            Company
          </Link> */}
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm/6 font-semibold text-gray-100">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      {/* <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                alt=""
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
                width={100}
              height={50}
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
              <Link
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Features
                </Link>
                <Link
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Features
                </Link>
                <Link
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Marketplace
                </Link>
                <Link
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Company
                </Link>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog> */}
    </header>
  )
}
