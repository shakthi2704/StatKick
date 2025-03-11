"use client"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"
import Link from "next/link"

import { FaHome, FaTable, FaChartBar, FaNewspaper } from "react-icons/fa"
import { RiTeamFill } from "react-icons/ri"
import { MdDashboard, MdFavorite } from "react-icons/md"
import { GiTeamDowngrade } from "react-icons/gi"

const MainNav = () => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <MdDashboard size={24} />
        </MenubarTrigger>
        <MenubarContent>
          <Link href="/dashboard">
            <MenubarItem>
              <FaHome />
              Home
            </MenubarItem>
          </Link>
          <MenubarSeparator />
          <Link href="/league">
            <MenubarItem>
              <FaTable />
              League
            </MenubarItem>
          </Link>
          <Link href="/teams">
            <MenubarItem>
              <GiTeamDowngrade />
              Teams
            </MenubarItem>
          </Link>
          <Link href="/players">
            <MenubarItem>
              <RiTeamFill />
              Players
            </MenubarItem>
          </Link>
          <Link href="/stats">
            <MenubarItem>
              <FaChartBar />
              Stats & Analytics
            </MenubarItem>
          </Link>
          <MenubarSeparator />
          <Link href="/news">
            <MenubarItem>
              <FaNewspaper />
              News
            </MenubarItem>
          </Link>
          <MenubarSeparator />
          <Link href="/favorites">
            <MenubarItem>
              <MdFavorite />
              Favorites
            </MenubarItem>
          </Link>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export default MainNav
