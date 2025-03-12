"use client"
import React, { useEffect, useState } from "react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TimeZone from "./time-zone"
import Accounts from "./accounts"
import Appearance from "./appearance"
import NotificationsSettings from "./notifcations"
const page = () => {
  return (
    <main className="flex flex-grow flex-col overflow-hidden px-4">
      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm">
          Manage your account settings and preferences.
        </p>
      </div>
      <Separator className="my-4 lg:my-6" />
      <div className="">
        <Tabs>
          <TabsList>
            <TabsTrigger value="zone" className="hover:bg-background">
              Time Zone
            </TabsTrigger>
            <TabsTrigger value="account" className="hover:bg-background">
              Account Settings
            </TabsTrigger>
            <TabsTrigger value="appearance" className="hover:bg-background">
              Appearance
            </TabsTrigger>
            <TabsTrigger value="notifications" className="hover:bg-background">
              Notifications
            </TabsTrigger>
          </TabsList>
          <div className="">
            <TabsContent value="zone" className="text-left">
              <TimeZone />
            </TabsContent>
            <TabsContent value="account" className="text-left">
              <Accounts />
            </TabsContent>
            <TabsContent value="appearance" className="text-left">
              <Appearance />
            </TabsContent>
            <TabsContent value="notifications" className="text-left">
              <NotificationsSettings />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </main>
  )
}

export default page
