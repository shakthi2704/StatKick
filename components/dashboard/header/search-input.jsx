"use client"
import React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

const SearchInput = () => {
  return (
    <Button
      variant="ghost"
      className="relative h-8 w-full flex-1 justify-start rounded-md border-b-2 text-sm font-normal text-muted-foreground shadow-none hover:bg-muted/50 sm:pr-12md:flex-none  md:w-56 md:flex-none"
    >
      <Search />
      <span className="ml-3">placeholder</span>
    </Button>
  )
}

export default SearchInput
