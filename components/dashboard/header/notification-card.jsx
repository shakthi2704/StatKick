import React from "react"
import { Check } from "lucide-react"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

function NotificationCard({ className, ...props }) {
  return (
    <Card className={`w-[380px] ${className}`} {...props}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Notifications</CardTitle>
          <Switch />
        </div>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>

      <CardFooter>
        <Button className="w-full bg-primary ">
          <Check /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  )
}

export default NotificationCard
