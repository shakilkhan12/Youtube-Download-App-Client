'use client'

import Link from "next/link"
import { BiVideo } from "react-icons/bi"

const Nav = () => {
  return (
    <nav className="border-b px-4">
        <div className="max-w-screen-xl mx-auto h-16 flex items-center">
           <Link href="/" className="text-[#00b887] font-bold text-lg flex items-center"><BiVideo size={55} /> <span>YT Downloader</span></Link>
        </div>
    </nav>
  )
}

export default Nav