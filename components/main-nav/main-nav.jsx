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
} from "react-icons/fa"
import { RiTeamFill } from "react-icons/ri"
import { MdDashboard, MdFavorite } from "react-icons/md"
import { GiTeamDowngrade } from "react-icons/gi"

const navLinks = [
  { href: "/", label: "Home", icon: <MdDashboard size={12} /> },
  { href: "/league", label: "League", icon: <FaTable size={12} /> },
  { href: "/teams", label: "Teams", icon: <FaFlag size={12} /> },
  { href: "/players", label: "Players", icon: <RiTeamFill size={12} /> },
  {
    href: "/stats",
    label: "Stats & Analytics",
    icon: <FaChartBar size={12} />,
  },
  { href: "/news", label: "News", icon: <FaNewspaper size={12} /> },
  { href: "/favorites", label: "Favorites", icon: <MdFavorite size={12} /> },
]

const MainNav = () => {
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <nav className=" text-foreground p-4 text-xs">
      <ul className="flex space-x-4">
        {navLinks.map((link, index) => (
          <li key={link.href + index}>
            {" "}
            {/* Use the combination of href and index for unique key */}
            <Link
              href={link.href}
              className={`flex items-center space-x-2 ${
                router.pathname === link.href ? "underline text-red-400" : ""
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default MainNav
