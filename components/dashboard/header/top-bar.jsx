"use client"
import React, { useState, useEffect } from "react"
import { formatDate } from "@/utils/dateUtils"

const TopBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!isClient) {
    return null
  }
  return (
    <div className="bg-background text-foreground text-xs py-1 mt-2 mb-4 flex justify-end items-center border-b-2">
      <span>
        {formatDate(currentTime)} {currentTime.toLocaleTimeString()}
      </span>
    </div>
  )
}

export default TopBar
