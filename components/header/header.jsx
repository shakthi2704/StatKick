"use client"
import React from "react"
import TopBar from "./top-bar"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import ModeToggle from "@/components/theme/mode-toggle"
import Notification from "./Notification"
import MainNav from "../main-nav/main-nav"
import SearchInput from "./search-input"
import ProfileDropdown from "./profile-dropdown"

const Header = () => {
  return (
    <div className="sticky top-0 z-10 backdrop-blur shadow-md">
      <TopBar />
      <header className="flex h-12 shrink-0 items-center gap-2  transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 dark:shadow-md dark:inset-shadow-gray-700">
        <div className="flex items-center gap-2">
          <Separator orientation="vertical" className="mr-2 h-4" />
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex  items-center justify-center rounded-md">
              <Image
                src="/images/logo.png"
                width={36}
                height={24}
                alt="StatStriker-logo"
              />
            </div>
            <span className="text-lg  text-foregroun ">StatStriker</span>
          </a>
        </div>

        <div className="flex-1 flex justify-center">
          <MainNav />
        </div>

        <div className="flex items-center  gap-1.5 md:gap-2  pr-4">
          <SearchInput />
          <ModeToggle />
          <Notification />
          <ProfileDropdown />
        </div>
      </header>
    </div>
  )
}

export default Header
