"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
  FaHome,
  FaTable,
  FaChartBar,
  FaNewspaper,
  FaFlag,
  FaUsers,
  FaStar,
} from "react-icons/fa"

const navLinks = [
  { href: "/", label: "Home", icon: <FaHome size={12} /> },
  { href: "/league", label: "League", icon: <FaTable size={12} /> },
  { href: "/teams", label: "Teams", icon: <FaUsers size={12} /> },
  { href: "/players", label: "Players", icon: <FaFlag size={12} /> },
  {
    href: "/stats",
    label: "Stats & Analytics",
    icon: <FaChartBar size={12} />, // Stats icon
  },
  { href: "/news", label: "News", icon: <FaNewspaper size={12} /> },
  { href: "/favorites", label: "Favorites", icon: <FaStar size={12} /> },
]

const MainNav = () => {
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <nav className=" text-foreground p-4 text-sm">
      <ul className="flex space-x-4">
        {navLinks.map((link, index) => (
          <li key={link.href + index}>
            <Link
              href={link.href}
              className={`flex items-center space-x-2 ${
                router.pathname === link.href ? "underline text-red-400" : ""
              }`}
            >
              {/* {link.icon} */}
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default MainNav
