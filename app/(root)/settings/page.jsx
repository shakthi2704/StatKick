"use client"

import React from "react"
import { Separator } from "@/components/ui/separator"
import SidebarNav from "./sidebar"
import { FaUser, FaPaintBrush, FaBell } from "react-icons/fa"

const sidebarNavItems = [
  {
    title: "Profile",
    icon: <FaUser size={18} />,
    href: "/settings/profile", // Ensure correct path
  },
  {
    title: "Appearance",
    icon: <FaPaintBrush size={18} />,
    href: "/settings/appearance",
  },
  {
    title: "Notifications",
    icon: <FaBell size={18} />,
    href: "/settings/notifications",
  },
]

const SettingsPage = ({ children }) => {
  return (
    <main className="flex flex-grow flex-col overflow-hidden px-4">
      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-4 lg:my-6" />
      <div className="flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="top-0 lg:sticky lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex w-full overflow-y-hidden p-1 pr-4">
          {children} {/* Render child pages here */}
        </div>
      </div>
    </main>
  )
}

export default SettingsPage
