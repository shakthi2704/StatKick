"use client"
import React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

const SearchInput = () => {
  return (
    <Button
      variant="ghost"
      className="relative h-8 w-full flex-1 justify-start rounded-md border-b-2 text-sm font-normal text-muted-foreground shadow-none hover:bg-muted/50 "
    >
      <Search size={20} />
    </Button>
  )
}

export default SearchInput
