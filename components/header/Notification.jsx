import React from "react"
import { Button } from "@/components/ui/button"
import NotificationCard from "./notification-card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Bell } from "lucide-react"
const Notification = () => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative border-b-2 ">
          <Bell />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" p-0" align="end" forceMount>
        <NotificationCard />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Notification
